import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import type { TabProps } from 'react-aria-components'

const testimonials = [
  {
    title: 'Telco',
    content:
      'Through this initiative, GrowthOps have shown to have the right capabilities to take our platform to the next level. We believe the refreshed U.COM.MY will equip us with more insights, enabling us to make more data-led decisions that will result in new digital experiences that will truly benefit our customers.',
    author: 'Jasmine Lee',
    position: '[Position]',
    companyName: '[Company Name]',
  },
  {
    title: 'Insurance',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'John Doe',
    position: '[Position]',
    companyName: '[Company Name]',
  },
  {
    title: 'Fintech',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Jane Smith',
    position: '[Position]',
    companyName: '[Company Name]',
  },
  {
    title: 'IT',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Lisa Brown',
    position: '[Position]',
    companyName: '[Company Name]',
  },
]

export function TestimonialTabs() {
  return (
    <Tabs className="flex flex-col w-full items-center gap-10">
      <TabList
        aria-label="Feeds"
        className="flex rounded-full p-1 border border-[#2B2B2B] max-w-sm"
      >
        {testimonials.map((testimonial) => (
          <TitleTab key={testimonial.title} id={testimonial.title}>
            {testimonial.title}
          </TitleTab>
        ))}
      </TabList>
      {testimonials.map((testimonial) => (
        <TabPanel
          key={testimonial.title}
          id={testimonial.title}
          className="ring-0 outline-hidden focus-visible:ring-0 focus-visible:outline-hidden"
        >
          <div className="flex gap-4 sm:gap-10">
            <div className="font-bold text-secondary text-4xl">&#8220;</div>
            <div className="flex flex-col gap-16">
              <p className="font-medium text-xl leading-8 sm:text-2xl sm:leading-9">
                {testimonial.content}
              </p>
              <div className="flex flex-col gap-3">
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-[#CCCCCC]">
                  {testimonial.position}, {testimonial.companyName}
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
      ))}
    </Tabs>
  )
}

function TitleTab(props: TabProps) {
  return (
    <Tab
      {...props}
      className={({ isSelected }) => `
        w-full rounded-full px-5 py-3 text-center cursor-pointer ring-foreground outline-hidden transition-colors focus-visible:ring-2
        ${isSelected ? 'font-bold bg-secondary text-background' : ''}
      `}
    />
  )
}
