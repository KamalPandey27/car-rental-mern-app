function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen fixed inset-0 z-1000 bg-black/20">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
