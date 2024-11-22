const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6">
      <h1 className="mb-4 text-xl text-gray-600">
        우리 댕댕이와{' '}
        <span className="font-bold text-[#3288FF]">함께 하는 활동!</span>
      </h1>
      <h2 className="mb-8 text-4xl LogoFont font-extrabold text-[#3288FF]">
        멍티비티
      </h2>
      <img
        src="../assets/Login/mainDogImg.svg"
        alt="Dog"
        className="mb-8 w-36 h-36"
      />
      <h3 className="mb-6 text-base font-bold text-gray-600">소셜로그인</h3>
      <div className="w-2/3 space-y-4">
        <button className="flex items-center justify-center w-full py-3 font-bold text-[#371D1E] bg-[#FEE500] rounded-[8px] hover:bg-yellow-300">
          카카오로 시작하기
        </button>
        <button className="flex items-center justify-center w-full py-3 font-bold border border-[#8A8A8A] rounded-[8px] hover:bg-blue-500">
          Google로 시작하기
        </button>
        <button className="flex items-center justify-center w-full py-3 font-bold text-white bg-[#00C73C] rounded-[8px] hover:bg-green-400">
          네이버로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Login;
