const Loader = () => {
  return (
    <>
      <div className="loader"></div>
      <style jsx>
        {`
          .loader {
            width: 20px;
            height: 20px;
            border: 4px solid #ccc;
            border-top-color: #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default Loader;
