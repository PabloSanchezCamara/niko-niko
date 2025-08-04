import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTES } from 'config/routes';

import { useI18n } from 'lib/i18n/translateProvider';

import { findMood, sendMood, updateMood } from 'api/person';

import { selectUser } from 'store/auth/selectors';

import { getItems } from './components/FaceMoods/FaceMoods.constants';

export const useMood = () => {
  const { t } = useI18n();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mood = params.get('mood');
  const date = params.get('date');
  const user = useSelector(selectUser);
  const personId = user.id;
  const navigate = useNavigate();

  const [selectedIcon, setSelectedIcon] = useState(mood);
  const [isLoading, setIsLoading] = useState(true);
  const [moodId, setMoodId] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedGif, setSelectedGif] = useState({
    gif: null,
    isEdited: false
  });

  const [textareaStatus, setTextareaStatus] = useState({
    isTextareaUpdating: false,
    textareaValue: '',
    isTextareaEdited: false
  });

  const [feedbackStatus, setFeedbackStatus] = useState({
    hasError: false,
    titleMessage: '',
    subtitleMessage: '',
    isCommentError: false
  });

  const moodItems = getItems();
  const validMoods = Object.keys(moodItems).map((key) => moodItems[key].name);

  const createMood = async (newMood) => {
    const body = {
      mood: !moodId ? newMood : selectedIcon,
      imageUrl: '',
      comment: '',
      date: date
    };

    const postResponse = await sendMood(personId, body);

    if (postResponse.error) {
      setFeedbackStatus(() => ({
        hasError: true,
        titleMessage: t('mood.error-title-state'),
        subtitleMessage: t('mood.error-subtitle-state')
      }));
      setIsLoading(false);
      setTextareaStatus((prevState) => ({
        ...prevState,
        isTextareaUpdating: false
      }));
      return;
    }
    setMoodId(postResponse.data.id);
    setSelectedIcon(body.mood);
    setFeedbackStatus(() => ({
      hasError: false,
      titleMessage: t('mood.title-state'),
      subtitleMessage: ''
    }));
    setIsLoading(false);
    setTextareaStatus((prevState) => ({
      ...prevState,
      isTextareaUpdating: false
    }));
  };

  const updateMoodOnInitialRender = async (
    response,
    newMood = null,
    newComment = null
  ) => {
    const body = {
      id: response.data.id,
      person: personId,
      mood: newMood ? newMood : selectedIcon,
      comment: newComment ? newComment : response.data.comment,
      date: date,
      company: response.data.company,
      imageUrl: selectedGif.gif ? selectedGif.gif.url : response.data.imageUrl
    };

    const updateResponse = await updateMood(personId, response.data.id, body);

    if (updateResponse.error) {
      setFeedbackStatus(() => ({
        hasError: true,
        titleMessage: newComment
          ? t('mood.error-title-comment')
          : t('mood.error-title-state'),
        subtitleMessage: newComment
          ? t('mood.error-subtitle-comment')
          : t('mood.error-subtitle-state'),
        isCommentError: !!newComment
      }));
      setIsLoading(false);
      setTextareaStatus((prevState) => ({
        ...prevState,
        isTextareaUpdating: false
      }));
      return;
    }

    if (!newMood || !newComment) {
      setSelectedIcon(!newMood ? selectedIcon : body.mood);

      setFeedbackStatus(() => ({
        titleMessage: !newMood ? t('mood.title-comment') : t('mood.title-state')
      }));
    }

    setIsLoading(false);
    setTextareaStatus((prevState) => ({
      ...prevState,
      isTextareaUpdating: false
    }));
  };

  const getMood = async (newMood = null) => {
    setIsLoading(true);
    const moodUpdated = newMood ? newMood : mood;

    const response = await findMood(personId, date);
    if (response.error && response.status === 500) {
      return navigate(ROUTES.app.genericError);
    }
    if (response.error) {
      setFeedbackStatus(() => ({
        hasError: true,
        titleMessage: t('mood.error-title-state'),
        subtitleMessage: t('mood.error-subtitle-state')
      }));
      setIsLoading(false);
      createMood(moodUpdated);
      return;
    }
    setTextareaStatus((prevState) => ({
      ...prevState,
      textareaValue: response.data.comment || ''
    }));
    if (response.data.imageUrl) {
      setSelectedGif({
        gif: {
          url: response.data.imageUrl,
          username: null,
          profile: null
        },
        isEdited: false
      });
    }
    setMoodId(response.data.id);
    updateMoodOnInitialRender(response, moodUpdated);
  };

  const updateMoodOnClick = (newMood = null, newComment = null) => {
    const response = {
      data: {
        id: moodId,
        mood: selectedIcon,
        company: user.company.id
      }
    };
    updateMoodOnInitialRender(response, newMood, newComment);
  };

  const handleIconChange = (e) => {
    setIsLoading(true);
    setSelectedIcon(e.target.value);
    if (feedbackStatus.hasError) {
      getMood(e.target.value);
      return;
    }
    if (!validMoods.includes(e.target.value) || !moodId) {
      createMood(e.target.value);
      return;
    }
    updateMoodOnClick(e.target.value, null);
  };

  const handleTextareaChange = (value) => {
    setTextareaStatus((prevState) => ({
      ...prevState,
      textareaValue: value,
      isTextareaEdited: true
    }));
  };

  const handleGifSelected = (gif) => {
    setSelectedGif({
      gif: {
        url: gif.images.original.url,
        username: gif.user?.display_name || null,
        profile: gif.user?.profile_url || null
      },
      isEdited: true
    });
    setModalIsOpen(false);
  };

  const buttonDisabled =
    textareaStatus.isTextareaUpdating ||
    (!textareaStatus.textareaValue &&
      !selectedGif.isEdited &&
      !feedbackStatus.isCommentError) ||
    (!textareaStatus.isTextareaEdited &&
      !selectedGif.isEdited &&
      !feedbackStatus.isCommentError);

  const handleSubmit = () => {
    setTextareaStatus((prevState) => ({
      ...prevState,
      isTextareaUpdating: true,
      isTextareaEdited: false
    }));
    setSelectedGif((prevState) => ({
      ...prevState,
      isEdited: false
    }));
    setIsLoading(true);
    updateMoodOnClick(null, textareaStatus.textareaValue);
  };
  return {
    getMood,
    handleIconChange,
    handleTextareaChange,
    handleSubmit,
    handleGifSelected,
    setModalIsOpen,
    isLoading,
    textareaStatus,
    feedbackStatus,
    selectedIcon,
    selectedGif,
    modalIsOpen,
    buttonDisabled
  };
};
