import { useSession } from "next-auth/client";

const Test = () => {
  const [session, loading] = useSession();

  return <div>test</div>;
};

Test.displayName = "Test";
export default Test;
