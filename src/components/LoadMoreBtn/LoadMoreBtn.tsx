
interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => (
  <div>
    <button onClick={onClick}>
      Load More
    </button>
  </div>
);
export default LoadMoreBtn;