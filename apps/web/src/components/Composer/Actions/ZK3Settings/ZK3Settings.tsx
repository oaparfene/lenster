import MenuTransition from '@components/Shared/MenuTransition';
import { Spinner } from '@components/UI/Spinner';
import { Tooltip } from '@components/UI/Tooltip';
import useOnClickOutside from '@components/utils/hooks/useOnClickOutside';
import { Menu } from '@headlessui/react';
import { KeyIcon, MusicNoteIcon, PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline';
import { Analytics } from '@lib/analytics';
import { t } from '@lingui/macro';
import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';
import { useId, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { usePublicationStore } from 'src/store/publication';
import { PUBLICATION } from 'src/tracking';

const ZK3: FC = () => {
  const attachments = usePublicationStore((state) => state.attachments);
  const isUploading = usePublicationStore((state) => state.isUploading);
  const [showMenu, setShowMenu] = useState(false);
  const id = useId();
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setShowMenu(false));

  const handleZK3 = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setShowMenu(false);

    alert('Work in progress. Please check back later.');
  };

  return (
    <Menu as="div">
      <Menu.Button
        onClick={() => setShowMenu(!showMenu)}
        className="rounded-full hover:bg-gray-300 hover:bg-opacity-20"
        aria-label="More"
      >
        {isUploading ? (
          <Spinner size="sm" />
        ) : (
          <Tooltip placement="top" content="ZK3">
            <KeyIcon className="w-5 h-5 text-brand" />
          </Tooltip>
        )}
      </Menu.Button>
      <MenuTransition show={showMenu}>
        <Menu.Items
          ref={dropdownRef}
          static
          className="absolute py-1 z-[5] mt-2 bg-white rounded-xl border shadow-sm dark:bg-gray-900 focus:outline-none dark:border-gray-700"
        >
          <Menu.Item
            as="label"
            className={({ active }) =>
              clsx(
                { 'dropdown-active': active },
                '!flex rounded-lg gap-1 space-x-1 items-center cursor-pointer menu-item'
              )
            }
            htmlFor={`image_${id}`}
            onClick={handleZK3}
          >
            <KeyIcon className="w-4 h-4 text-brand" />
            <span className="text-sm">Attach ZK3 Proof</span>
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

export default ZK3;
