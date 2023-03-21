import UserProfile from '@components/Shared/UserProfile';
import formatTime from '@lib/formatTime';
import getAppName from '@lib/getAppName';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Publication } from 'lens';
import type { FC } from 'react';

import PublicationActions from './Actions';
import PublicationMenu from './Actions/Menu';
import HiddenPublication from './HiddenPublication';
import PublicationBody from './PublicationBody';
import PublicationStats from './PublicationStats';
import PublicationType from './Type';

dayjs.extend(relativeTime);

interface Props {
  publication: Publication;
}

const FullPublication: FC<Props> = ({ publication }) => {
  const isMirror = publication.__typename === 'Mirror';
  const profile = isMirror ? publication?.mirrorOf?.profile : publication?.profile;
  const timestamp = isMirror ? publication?.mirrorOf?.createdAt : publication?.createdAt;

  // Count check to show the publication stats only if the publication has a comment, like or collect
  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;
  const reactionCount = isMirror
    ? publication?.mirrorOf?.stats?.totalUpvotes
    : publication?.stats?.totalUpvotes;
  const collectCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfCollects
    : publication?.stats?.totalAmountOfCollects;
  const showStats = mirrorCount > 0 || reactionCount > 0 || collectCount > 0;

  return (
    <article className="p-5">
      <PublicationType publication={publication} showType />
      <div>
        <div className="flex justify-between pb-4 space-x-1.5">
          {/* @ts-ignore */}
          <div className="flex justify-start">
            <UserProfile profile={profile ?? publication?.collectedBy?.defaultProfile} showStatus />
            <label className="!bg-brand-500 !text-white text-xs dark:bg-opacity-10 rounded-full ml-4 mb-5 px-3 sm:px-4 py-1.5 text-brand border border-brand-300 dark:border-brand-500">
              {publication?.metadata.attributes.find((e) => e.traitType === 'zk3Circle')?.value?.toString()}
            </label>
          </div>
          <PublicationMenu publication={publication} />
        </div>
        <div className="ml-[53px]">
          {publication?.hidden ? (
            <HiddenPublication type={publication.__typename} />
          ) : (
            <>
              <PublicationBody publication={publication} />
              <div className="text-sm lt-text-gray-500 my-3">
                <label>metadata: </label>
                <label>{JSON.stringify(publication?.metadata.attributes)}</label>
                <br />
                <span title={formatTime(timestamp)}>
                  {dayjs(new Date(timestamp)).format('hh:mm A · MMM D, YYYY')}
                </span>
                {publication?.appId ? <span> · Posted via {getAppName(publication?.appId)}</span> : null}
              </div>
              {showStats && (
                <>
                  <div className="divider" />
                  <PublicationStats publication={publication} />
                </>
              )}
              <div className="divider" />
              <PublicationActions publication={publication} showCount />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default FullPublication;
