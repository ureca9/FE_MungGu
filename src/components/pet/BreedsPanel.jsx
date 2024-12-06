import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useEffect, useState } from 'react';
import { BasicInput } from '../../stories/Input/BasicInput';
import { IoMdSearch } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { motion } from 'framer-motion';
import { GetBreedsTypeData } from '../../api/pet';
const BreedsPanel = ({
  onBreedSelect,
  breedName,
  breedId,
  setBreedName,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [breedsType, setBreedsType] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const Breeds = async () => {
    try {
      const response = await GetBreedsTypeData();
      setBreedsType(response.data);
    } catch (error) {
      console.error('견종목록 오류 확인:', error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log('페널 토큰 :', token);

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    Breeds();
  }, [isLoggedIn]);

  useEffect(() => {
    if (breedId) {
      const selectedBreed = breedsType.find(
        (breed) => breed.breedId === breedId,
      );
      if (selectedBreed) {
        setBreedName(selectedBreed.name);
      }
    }
  }, [breedId, breedsType]);

  const handleBreedClick = (breedId, breedName) => {
    if (onBreedSelect) {
      onBreedSelect(breedId, breedName);
    }
    setIsOpen(false);
  };

  return (
    <>
      <BasicInput
        label="견종"
        id="breedId"
        placeholder="견종"
        value={breedName}
        readOnly
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
          <motion.div
            initial={{ opacity: 1, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: -200 }}
            transition={{ duration: 0.5 }}
          >
            <DialogPanel className="w-[768px] px-10 py-7 h-[580px] flex flex-col rounded-t-[50px] bg-white border">
              <div className="flex justify-center">
                <div className="flex w-64 h-[10px]  mb-6 bg-black rounded-full "></div>
              </div>
              <div className="relative flex items-center w-full mb-8">
                <DialogTitle className="mx-auto text-2xl font-bold">
                  견종을 검색해주세요.
                </DialogTitle>
                <IoIosCloseCircle
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer absolute right-0 size-9 text-[#D9D9D9]"
                />
              </div>
              <div className="flex flex-col px-20">
                <div className="flex justify-end">
                  <input
                    type="search"
                    placeholder="견종을 검색해주세요"
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border w-full px-4 border-[#8A8A8A] bg-[#F5F5F5] h-14 rounded-lg mb-7"
                  />
                  {!searchValue && (
                    <IoMdSearch className="flex absolute mr-2 mt-3 size-8 text-[#8A8A8A]" />
                  )}
                </div>
                <Description className="text-lg font-semibold">
                  많이 찾는 견종
                </Description>
                <ul>
                  {breedsType
                    .filter((breed) => {
                      if (!searchValue) return breed.isFrequented;
                      return breed.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                    })
                    .map((breeds) => (
                      <li
                        key={breeds.breedId}
                        value={breeds.breedId}
                        onClick={() =>
                          handleBreedClick(breeds.breedId, breeds.name)
                        }
                        className="my-3 cursor-pointer"
                      >
                        {breeds.name}
                      </li>
                    ))}
                </ul>
              </div>
            </DialogPanel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};

export default BreedsPanel;
