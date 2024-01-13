const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { Button } = VM.require("buildhub.near/widget/components.Button");

Button || (Button = () => <></>);
Feed = Feed || (() => <></>); // ensure it's defined or set to a default component

const { type, hashtag } = props;
type = hashtag;
hashtag = type;

const { Post } = VM.require("buildhub.near/widget/components");
Post = Post || (() => <></>);

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const feeds = {
  resolutions: {
    label: "Resolutions",
    icon: "bi-calendar3",
    name: "resolution",
    hashtag: "nearyearresolutions2024",
    template: `### 🎉 NEAR YEAR RESOLUTIONS: 2024
(posted via [Build DAO Gateway](https://nearbuilders.org/feed))

**🌟 REFLECTIONS ON THE PAST YEAR:**
- [Reflection 1 from the past year]
- [Reflection 2 from the past year]

**🎯 NEW YEAR'S RESOLUTIONS:**
- [Resolution 1]
- [Resolution 2]

**📊 MEASURING SUCCESS:**
- [Metric 1 for Success]
- [Metric 2 for Success]
`
  },
  updates: {
    label: "Updates",
    icon: "bi-bell",
    name: "update",
    template: `### BUILDER UPDATE:  ${formatDate(new Date())}
(posted via [Build DAO Gateway](https://nearbuilders.org/feed?hashtag=update))

**✅ DONE**
- [what'd you do]
- [link proof]

**⏩ NEXT**
- [what's next?]
- [what are you thinking about?]

**🛑 BLOCKERS**
- [what's blocking you?]
- [how can someone help?]
`
  },
  documentation: {
    label: "Documentation",
    icon: "bi-book",
    name: "documentation",
    template: `## TITLE
(posted via [Build DAO Gateway](https://nearbuilders.org/feed?hashtag=documentation))

**WHAT IS _____?**
- [context]
- [why is it important?]

**EXAMPLE**
- [how can this be demonstrated?]
- [what is the expected outcome?]

**USAGE**
- [where is it used?]
- [how to use it]
`
  },
  question: {
    label: "Question",
    icon: "bi-question-lg",
    name: "question",
    template: `## what is your question?
(posted via [Build DAO Gateway](https://nearbuilders.org/feed?hashtag=question))

[what are you thinking about?]
[why are you asking?]
`
  },
  opportunity: {
    label: "Opportunity",
    icon: "bi-briefcase",
    name: "opportunity",
    template: `## TITLE
(posted via [Build DAO Gateway](https://nearbuilders.org/feed?hashtag=opportunity))

[what is the opportunity?]

[explain the motivation or reason]

`
  },
  idea: {
    label: "Idea",
    icon: "bi-lightbulb",
    name: "idea",
    template: ``
  },
  task: {
    label: "Task",
    icon: "bi-check-lg",
    name: "task",
    template: `## TASK TITLE
(posted via [Build DAO Gateway](https://nearbuilders.org/feed?hashtag=task))

**What needs to be done?**
- [Describe the task or action steps]

**Context or additional information:**
- [Provide any context or details]
`
  }
};

const Container = styled.d

const [activeFeed, setActiveFeed] = useState(type || "resolutions");
const [template, setTemplate] = useState("What did you have in mind?");

return (
  <Widget
    src="/*__@appAccount__*//widget/components.AsideWithMainContent"
    props={{
      sideContent: Object.keys(feeds || {}).map((route) => {
        const data = feeds[route];
        return (
          <Button
            id={route}
            variant={activeFeed === route ? "primary" : "outline"}
            onClick={() => setActiveFeed(route)}
            className={
              "align-self-stretch flex-shrink-0 justify-content-start fw-medium"
            }
            style={{ fontSize: "14px" }}
          >
            <i className={`bi ${data.icon} `}></i>
            {data.label}
          </Button>
        );
      }),
      mainContent: (
        <>
          
        {context.accountId ? (
          activeFeed !== "bookmarks" ? (
            <Widget
              src="/*__@appAccount__*//widget/Compose"
              props={{
                feed: feeds[activeFeed],
                template: feeds[activeFeed].template,
              }}
            />
          ) : (
            <Widget src="/*__@appAccount__*//widget/Bookmarks" />
          )
        ) : (
          <Widget
            src="/*__@appAccount__*//widget/components.login-now"
            props={props}
          />
        )}
        {activeFeed !== "bookmarks" && (
          <Feed
            index={[
              {
                action: "hashtag",
                key: activeFeed,
                options: {
                  limit: 10,
                  order: "desc",
                  accountId: props.accounts,
                },
                cacheOptions: {
                  ignoreCache: true,
                },
              },
            ]}
            Item={(p) => (
              <Post
                accountId={p.accountId}
                blockHeight={p.blockHeight}
                noBorder={true}
              />
            )}
          />
        )}
        </>
      )
    }}
  />
);
