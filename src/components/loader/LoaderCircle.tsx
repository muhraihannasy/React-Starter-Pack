function LoaderCircle() {
  return (
    <div className="relative ">
      <div
        className="w-5 h-5 rounded-full absolute
                            border-2 border-solid border-slate-200"
      ></div>

      <div
        className="w-5 h-5 rounded-full animate-spin
                            border-2 border-solid border-blue-500 border-t-transparent"
      ></div>
    </div>
  );
}

export default LoaderCircle;
