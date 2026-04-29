import LoaderIcon from '@/components/icons/loader-icon';

const LoadingScreen = () => {
  return (
    <div className="absolute z-[999999] flex h-screen w-full items-center justify-center bg-background">
      <div className="flex h-40 w-full items-center justify-center gap-2">
        <LoaderIcon />
        Loading...
      </div>
    </div>
  );
};

export default LoadingScreen;
