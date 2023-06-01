export const Preview: React.FC<{ path: string | null }> = ({ path }) => {
  return (
    <>
      {path && (
        <div
          className="rounded p-1 m-5"
          style={{
            width: "30%",
            height: "300px",
            backgroundImage: `url(${path}`,
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </>
  );
};
