import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../app/store";
import { auth as firebaseAuth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser, setUserLoading } from "../../features/user/userSlice";
import { IUser } from "../../types/user";
import { useSelector } from "react-redux";
import {
  setCurrentUser,
  setCurrentUserLoading,
} from "../../features/currentUser/currentUserSlice";

const Subscribe = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((current) => {
      dispatch(setCurrentUserLoading(true));
      if (current) {
        const currentUserData = {
          uid: current.uid,
          displayName: current.displayName!,
          email: current.email!,
        };
        dispatch(setCurrentUser(currentUserData));
      } else {
        dispatch(setCurrentUser(null));
      }
      dispatch(setCurrentUserLoading(false));
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        dispatch(setUserLoading(true));
        let user = doc.data() as IUser;
        dispatch(setUser(user));
        dispatch(setUserLoading(false));
      });
    } else {
      dispatch(setUserLoading(true));
      dispatch(setUser(null));
      dispatch(setUserLoading(false));
    }
  }, [currentUser]);

  return null;
};

export default Subscribe;
