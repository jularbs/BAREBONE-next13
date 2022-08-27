import "./styles.scss";

const GalleryTile = () => {
  return (
    <>
      <div className="gallery-tile-container">
        <div className="content-wrapper">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="tile-container">
          <div
            className="tile-item span-2"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1659535828770-6d9e1915b5dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80')`,
            }}
          ></div>
          <div
            className="tile-item"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1659535907680-0e219b46c01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80')`,
            }}
          ></div>
          <div
            className="tile-item"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1661435806102-1f9fa4c6050f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80')`,
            }}
          ></div>
          <div
            className="tile-item"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1661505084106-0fcf9d68100b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80')`,
            }}
          ></div>
          <div
            className="tile-item"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1659535867362-f3ed3d7b5513?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80')`,
            }}
          ></div>
          <div
            className="tile-item span-2"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1661501560798-562d7223dbbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default GalleryTile;
