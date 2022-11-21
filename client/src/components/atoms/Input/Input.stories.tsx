import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Standard = Template.bind({});
Standard.args = {};

// export const Standard: ComponentStory<typeof Input> = () => {
//   const [text, setText] = useState('');

//   return (
//     <Input
//       type="text"
//       value={text}
//       onChange={(e) => setText(e.currentTarget.value)}
//       name="text"
//     />
//   );
// };
