import MenuTransition from '@components/Shared/MenuTransition';
import { Spinner } from '@components/UI/Spinner';
import { Tooltip } from '@components/UI/Tooltip';
import useOnClickOutside from '@components/utils/hooks/useOnClickOutside';
import { Menu } from '@headlessui/react';
import { KeyIcon } from '@heroicons/react/outline';
// import { t } from '@lingui/macro';
import clsx from 'clsx';
import type { FC } from 'react';
import { useId, useRef, useState } from 'react';
// import toast from 'react-hot-toast';
import { usePublicationStore } from 'src/store/publication';
// import { PUBLICATION } from 'src/tracking';

const ZK3: FC = () => {
  // const attachments = usePublicationStore((state) => state.attachments);

  const isUploading = usePublicationStore((state) => state.isUploading);
  const [showMenu, setShowMenu] = useState(false);
  const id = useId();
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setShowMenu(false));

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
            <KeyIcon className="text-brand h-5 w-5" />
          </Tooltip>
        )}
      </Menu.Button>
      <MenuTransition show={showMenu}>
        <Menu.Items
          ref={dropdownRef}
          static
          className="absolute z-[5] mt-2 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        >
          <Menu.Item
            as="label"
            className={({ active }) =>
              clsx(
                { 'dropdown-active': active },
                'menu-item !flex cursor-pointer items-center gap-1 space-x-1 rounded-lg'
              )
            }
            htmlFor={`image_${id}`}
            // onClick={handleZK3}
          >
            <KeyIcon className="text-brand h-4 w-4" />
            <span className="text-sm">Attach ZK3 Proof</span>
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

export default ZK3;
