import type { NextPage } from "next";
import { useContext } from "react";

import { appStateContext } from "client/state";

const Profile: NextPage = () => {
  const { state } = useContext(appStateContext);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default Profile;
