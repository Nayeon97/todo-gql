import { ComponentStory, ComponentMeta, StoryObj } from "@storybook/react";
import { userEvent } from "@storybook/testing-library";
import { within } from "@testing-library/react";
import { useState } from "react";
import CursorTodoItems from "./CursorTodoItems";

export default {
  title: "CursorTodos",
  component: CursorTodoItems,
} as ComponentMeta<typeof CursorTodoItems>;

const Template: ComponentStory<typeof CursorTodoItems> = (args) => (
  <CursorTodoItems {...args} />
);

// export const Standard = Template.bind({});

const User = {
  id: "user2",
  end: true,
  cursorTodos: {
    edges: [
      {
        cursor: "dG9kbzo5",
        node: {
          id: "todo:0",
          text: "1",
          completed: true,
        },
      },
      {
        cursor: "dG9kbzo6",
        node: {
          id: "todo:1",
          text: "2",
          completed: false,
        },
      },
      {
        cursor: "dG9kbzo7",
        node: {
          id: "todo:2",
          text: "3",
          completed: false,
        },
      },
      {
        cursor: "dG9kbzo8",
        node: {
          id: "todo:3",
          text: "todo를 어엄청 길게에 적으면 어떻게 되냐아아아아아아아아",
          completed: false,
        },
      },
      {
        cursor: "dG9kbzo9",
        node: {
          id: "todo:4",
          text: "5555",
          completed: false,
        },
      },
    ],
    pageInfo: {
      hasNextPage: true,
    },
  },
};

export const Standard: StoryObj = () => {
  const [end, setEnd] = useState(true);

  const handleLoadMore = () => {
    if (User.cursorTodos.pageInfo.hasNextPage) {
      //   fetchMore({
      //     variables: {
      //       cursor: after,
      //     },
      //   });
    }
  };

  return <CursorTodoItems user={User} end={end} onLoadMore={handleLoadMore} />;
};

Standard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText("더보기"));
};

Standard.storyName = "TodoItems";

// Standard.args = {
//   user: User,
//   end: true,
// };
