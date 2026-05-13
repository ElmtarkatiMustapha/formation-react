import UserView from ".";

let originalFetch = globalThis.fetch;

export default {
  title: "pages/view-user",
  component: UserView,
  beforeEach() {
    globalThis.fetch = async (url) => {
      console.log("[MOCK FETCH USER]", url);

      if (url.includes("/1"))
        return new Response(
          JSON.stringify({
            id: 1,
            firstName: "Alice",
            lastName: "bob",
            email: "dd@dd.com",
            phone: "0666558877",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      else
        return new Response(JSON.stringify(null), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
    };
  },
  afterAll() {
    globalThis.fetch = originalFetch;
  },
};

export const displayUserWithSuccess = {
  parameters: {
    path: "/users/1/view",
    pathname: "/users/:id/view",
  },
};

export const displayUserWithError = {
  parameters: {
    path: "/users/2/view",
    pathname: "/users/:id/view",
  },
};
