import { useEffect, useRef, useState } from 'react';

import { DateTypes, useFormatDate } from 'business/useFormatDate.hooks';

import IconMood from '../IconMood/IconMood.view';
import Comment from '../Comment/Comment.view';
import { getItems } from '../IconMood/IconMood.constants';

import {
  CommentMasonryStyled,
  DateStyled,
  GridStyled,
  IconsListStyled,
  MoodRowStyled,
  MoodsListContainerStyled,
  MoodsWrapperStyled,
  SeparatorStyled
} from './MoodsList.styled';

const MasonryGrid = ({ children }) => {
  const gridRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const images = grid.querySelectorAll('img');

    const waitForImages = () =>
      Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        })
      );

    const applyMasonry = () => {
      const rowHeight = parseFloat(getComputedStyle(grid).gridAutoRows);
      const gap = parseFloat(getComputedStyle(grid).gap);

      Array.from(grid.children).forEach((item) => {
        const commentContent = item.firstElementChild;
        if (!commentContent) return;

        const commentHeight = commentContent.getBoundingClientRect().height;
        const rowSpan = Math.ceil((commentHeight + gap) / (rowHeight + gap));

        item.style.gridRowEnd = `span ${rowSpan}`;
      });
    };

    waitForImages().then(() => {
      applyMasonry();
      setReady(true);
    });
  }, [children]);

  return (
    <GridStyled
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease' }}
      data-testid="masonry-grid"
      ref={gridRef}
    >
      {children}
    </GridStyled>
  );
};

const MoodsList = ({ moodsPerDay }) => {
  const { getDateTexts } = useFormatDate();

  const weekdays = getDateTexts(DateTypes.DAYS);
  const months = getDateTexts(DateTypes.SHORT_MONTHS);
  const moodNames = ['excellent', 'good', 'fair', 'bad', 'awful'];
  const moodItems = getItems();
  const bigIcon = moodItems.big;
  const smallIcon = moodItems.small;

  const nonEmptyDays = moodsPerDay
    .filter((day) => Array.isArray(day) && day.length > 0)
    .slice(0, 5);

  if (nonEmptyDays.length === 0) return <MoodsListContainerStyled />;

  return (
    <MoodsListContainerStyled>
      {nonEmptyDays.map((dayMoods, index) => {
        const mood = dayMoods[0];
        const date = new Date(mood.date);
        const weekDay = weekdays[date.getDay()];
        const weekDayMayus = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const formattedDate = `${weekDayMayus}, ${day} ${month}`;

        const orderedMoods = moodNames.map((type) => ({
          type,
          moods: dayMoods.filter((m) => m.mood === type)
        }));

        return (
          <div key={mood.date}>
            <MoodsWrapperStyled>
              <DateStyled>{formattedDate}</DateStyled>
              <IconsListStyled>
                {orderedMoods.map(({ type, moods }) =>
                  moods.length > 0 ? (
                    <MoodRowStyled key={type}>
                      {moods.map((m, index) => (
                        <IconMood
                          key={index}
                          name={m.mood}
                          moodItems={bigIcon}
                        />
                      ))}
                    </MoodRowStyled>
                  ) : null
                )}
              </IconsListStyled>
            </MoodsWrapperStyled>
            <MasonryGrid>
              {dayMoods
                .filter(({ comment, imageUrl }) => comment || imageUrl)
                .sort(
                  (firstMood, secondMood) =>
                    moodNames.indexOf(firstMood.mood) -
                    moodNames.indexOf(secondMood.mood)
                )
                .map((mood) => (
                  <CommentMasonryStyled key={mood.id}>
                    <Comment mood={mood} moodItems={smallIcon} />
                  </CommentMasonryStyled>
                ))}
            </MasonryGrid>
            {index < nonEmptyDays.length - 1 && <SeparatorStyled />}
          </div>
        );
      })}
    </MoodsListContainerStyled>
  );
};

export default MoodsList;
