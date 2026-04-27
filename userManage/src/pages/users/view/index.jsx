import { useEffect } from "react";
import { useParams } from "react-router";
import FormUser from "../../../components/formUser";
import useFetchUser from "../../../hooks/users/useFetchUser";
import Loader from "../../../components/loader";
import useAlert from "../../../hooks/alerts/useAlert";

export default function UserView() {
  const { id } = useParams();
  const { showAlert } = useAlert();
  const { user, loading, error: fetchError } = useFetchUser(id);

  useEffect(() => {
    if (fetchError) showAlert(fetchError, "error");
  }, [fetchError, showAlert]);
 
  return (
    loading? 
    <Loader/> 
    :
    <div className="container">
      <h2>User Details</h2>
      <FormUser
        handleSubmit={() => {}}
        formData={user}
        handleChange={() => {}}
        disable={true}
      />
    </div>
  );
}
