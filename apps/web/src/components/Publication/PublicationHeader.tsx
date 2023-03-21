import UserProfile from '@components/Shared/UserProfile';
import useStaffMode from '@components/utils/hooks/useStaffMode';
import clsx from 'clsx';
import type { FeedItem, Publication } from 'lens';
import type { FC } from 'react';

import PublicationMenu from './Actions/Menu';
import Source from './Source';

interface Props {
  publication: Publication;
  className?: string;
  feedItem?: FeedItem;
}

const PublicationHeader: FC<Props> = ({ publication, className = '', feedItem }) => {
  const { allowed: staffMode } = useStaffMode();
  const isMirror = publication.__typename === 'Mirror';
  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem ? (firstComment ? firstComment : feedItem?.root) : publication;
  const profile = feedItem
    ? rootPublication.profile
    : isMirror
    ? publication?.mirrorOf?.profile
    : publication?.profile;
  const timestamp = feedItem
    ? rootPublication.createdAt
    : isMirror
    ? publication?.mirrorOf?.createdAt
    : publication?.createdAt;

  return (
    <div className={clsx('flex justify-between space-x-1.5', className)}>
      <div className="flex justify-start">
        <span onClick={(event) => event.stopPropagation()}>
          <UserProfile
            // @ts-ignore
            profile={profile ?? publication?.collectedBy?.defaultProfile}
            timestamp={timestamp}
            showStatus
          />
        </span>
        <label className="!bg-brand-500 !text-white text-xs dark:bg-opacity-10 rounded-full ml-4 mb-5 px-3 sm:px-4 py-1.5 text-brand border border-brand-300 dark:border-brand-500">
          {publication?.metadata.attributes.find((e) => e.traitType === 'zk3Circle')?.value?.toString()}
        </label>
      </div>
      <div className="flex items-center space-x-1 !-mr-[7px]">
        {staffMode && <Source publication={publication} />}
        <PublicationMenu publication={publication} />
      </div>
    </div>
  );
};

export default PublicationHeader;
