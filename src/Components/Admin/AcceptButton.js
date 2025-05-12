import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleApproveStatus } from "../../Redux/Actions/StatusAction";

function AcceptButton({ id, setLoading }) {
  let dipatch = useDispatch();

  const handleApprove = async () => {
    setLoading(true);
    try {
      await dipatch(handleApproveStatus(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        size="sm"
        className="approveButton"
        onClick={handleApprove}
      >
        Approve
      </Button>
    </div>
  );
}

export default AcceptButton;
