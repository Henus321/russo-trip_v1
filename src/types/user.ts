import { User } from 'firebase/auth';

export interface UserContextState {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
