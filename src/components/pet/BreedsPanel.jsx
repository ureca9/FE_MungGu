import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React, { useState } from 'react';
import { BasicInput } from '../../stories/Input/BasicInput';

const BreedsPanel = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BasicInput
        label="견종"
        id="breedId"
        placeholder="견종"
        // onChange={(e) => setBreedId(e.target.value)}
        // value={breedId}
        onClick={() => setIsOpen(true)}
        required
        {...props}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className={`fixed inset-0 transition-opacity ${isOpen ? 'opacity-50 bg-black' : 'opacity-0'}`}
        ></div>
        <div className="fixed inset-0 flex items-end justify-center w-screen h-full">
          <DialogPanel className="w-[768px] p-12 h-[580px] flex flex-col rounded-t-[50px] bg-white border">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default BreedsPanel;
