'use client';

import { Icon } from '@/assets/icons';
import { useMemo, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import { TBlockchainInformationData, TBlockchainInformationType } from '../../type';
import BlockchainEventList from './BlockchainEventList';

const eventTabList: { text: string; value: TBlockchainInformationType }[] = [
  { text: '해커톤', value: 'hackathon' },
  { text: '밋업', value: 'meetup' },
] as const;

export type TEventTab = (typeof eventTabList)[number]['value'];

const BlockchainEventSectionClient = ({
  hackathonList,
  meetupList,
}: {
  hackathonList: TBlockchainInformationData[];
  meetupList: TBlockchainInformationData[];
}) => {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [currentEventTabValue, setCurrentEventTabValue] = useState<TEventTab>(eventTabList[0].value);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = useMemo(
    () => Math.ceil((currentEventTabValue === 'hackathon' ? hackathonList.length : meetupList.length) / 4),
    [hackathonList, meetupList, currentEventTabValue]
  );

  const handleEventTabClick = (selectedEventTab: TEventTab) => {
    if (swiperRef && swiperRef?.current) {
      setCurrentPage(1);
      swiperRef.current.swiper.slideTo(0, 0);
    }

    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }

    setCurrentEventTabValue(selectedEventTab);
  };

  const handlePrevClick = () => {
    if (swiperRef && swiperRef?.current) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef && swiperRef?.current) {
      setCurrentPage((prev) => Math.min(prev + 1, maxPage));
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-[4rem] pb-[2.4rem] mobile:px-[2rem]">
        <div className="flex items-center gap-x-[1.2rem]">
          {eventTabList.map((eventTab) => {
            return (
              <button
                key={eventTab.value}
                className={`cursor-pointer rounded-[0.8rem] px-[1.6rem] py-[0.5rem] ${
                  currentEventTabValue === eventTab.value
                    ? 'bg-gray-900 text-body-2-semibold text-gray-100'
                    : 'bg-background text-body-2-medium text-gray-700'
                }`}
                onClick={() => handleEventTabClick(eventTab.value)}
              >
                {eventTab.text}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-x-[2rem] opacity-0 md:opacity-100">
          <button
            className="flex h-[2.8rem] w-[2.8rem] rotate-180 cursor-pointer items-center justify-center rounded-full border border-solid border-blue-100 bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={currentPage === 1}
            onClick={handlePrevClick}
          >
            <Icon name="ArrowRight" />
          </button>
          <button
            className="flex h-[2.8rem] w-[2.8rem] cursor-pointer items-center justify-center rounded-full border border-solid border-blue-100 bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={currentPage === maxPage}
            onClick={handleNextClick}
          >
            <Icon name="ArrowRight" />
          </button>
        </div>
      </div>

      <div className="md:px-[4rem] mobile:px-0">
        <BlockchainEventList
          key={currentEventTabValue}
          blockchainEventType={currentEventTabValue}
          blockchainEventList={currentEventTabValue === 'hackathon' ? hackathonList : meetupList}
          swiperRef={swiperRef}
          scrollRef={scrollRef}
        />
      </div>
    </div>
  );
};

export default BlockchainEventSectionClient;
