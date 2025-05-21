import { z } from 'zod/v4'
import { useForm } from '@tanstack/react-form'
import {
  Button,
  Checkbox,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  NumberField,
  Popover,
  Radio,
  RadioGroup,
  Select,
  TextArea,
  TextField,
} from 'react-aria-components'
import { useEffect, useMemo, useState } from 'react'
import type { Key } from 'react-aria-components'
import ChevronDownIcon from '@/components/ui/Chevron-Down'
import ChevronUpIcon from '@/components/ui/Chevron-Up'
import RadioUncheckedIcon from '@/components/ui/Radio-Unchecked'
import RadioCheckedIcon from '@/components/ui/Radio-Checked'
import CheckboxUncheckedIcon from '@/components/ui/Checkbox-Unchecked'
import CheckboxCheckedIcon from '@/components/ui/Checkbox-Checked'
import { asiaCountryCodes } from '@/components/contact/contact-us/AsiaCountryCodes'

const radioValues = [
  'Become a client',
  'Join the team',
  'Investor enquiry',
  'Others',
]

const FormSchema = z.object({
  fullName: z.string().nonempty('This field must not be empty'),
  phoneNumber: z.e164('This field must be a valid phone number'),
  workEmail: z.email('This field must be a valid email'),
  wantsTo: z.union(
    radioValues.map((value) => z.literal(value)),
    'This field is required',
  ),
  tellUsMore: z.string().nonempty('This field must not be empty'),
  subscription: z.boolean(),
  privacy: z.literal(true, 'This field is required'),
})

export function ContactForm() {
  const form = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      workEmail: '',
      wantsTo: '',
      tellUsMore: '',
      subscription: false,
      privacy: false,
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value }) => {
      // You would call a backend API to submit the form data
      console.log(value)
    },
  })

  const [selectedKey, setSelectedKey] = useState<Key>('Malaysia')
  const [rawPhoneInput, setRawPhoneInput] = useState('')

  const selectedCode = useMemo(() => {
    return asiaCountryCodes.find((c) => c.name === selectedKey)?.code ?? ''
  }, [selectedKey])

  useEffect(() => {
    if (rawPhoneInput.length !== 0) {
      form.setFieldValue('phoneNumber', selectedCode + rawPhoneInput)
      form.validateField('phoneNumber', 'change')
    }
  }, [selectedCode, rawPhoneInput])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="grid lg:grid-cols-2 gap-y-8 gap-x-8 w-fit"
    >
      <div className="lg:col-span-2">
        <form.Field
          name="fullName"
          children={(field) => {
            return (
              <TextField
                isInvalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
                className="flex flex-col gap-2 lg:max-w-[calc(50%-16px)]"
              >
                <Label
                  htmlFor={field.name}
                  className="font-semibold text-sm text-[#999D9F]"
                >
                  Full name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="font-medium h-13 bg-[#0E1015] rounded-xl border-1 border-foreground/24 px-4"
                />

                {field.state.meta.isTouched && !field.state.meta.isValid ? (
                  <FieldError className="text-sm text-red-400">
                    {field.state.meta.errors[0]?.message}
                  </FieldError>
                ) : null}
              </TextField>
            )
          }}
        />
      </div>
      <div>
        <form.Field
          name="phoneNumber"
          children={(field) => (
            <NumberField
              isInvalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              formatOptions={{ useGrouping: false }}
              className="flex flex-col gap-2 w-full"
            >
              <Label
                htmlFor={field.name}
                className="font-semibold text-sm text-[#999D9F]"
              >
                Phone number
              </Label>
              <div className="flex">
                <Select
                  className="w-full max-w-24"
                  selectedKey={selectedKey}
                  onSelectionChange={setSelectedKey}
                  aria-label="Country code"
                >
                  {({ isOpen }) => (
                    <>
                      <Button className="flex gap-2 h-13 bg-[#1B1D24] rounded-l-xl items-center justify-center w-full border-y-1 border-l-1 border-l-foreground/24 border-y-foreground/24">
                        <div className="font-medium">{selectedCode}</div>
                        {isOpen ? (
                          <ChevronUpIcon className="h-4 w-4 fill-foreground" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 fill-foreground" />
                        )}
                      </Button>

                      <Popover>
                        <ListBox className="z-50 max-h-60 overflow-y-scroll bg-[#1B1D24] rounded-xl px-1 py-1 border-1 border-foreground/24">
                          {asiaCountryCodes.map((country) => (
                            <ListBoxItem
                              key={country.name}
                              id={country.name}
                              aria-label={`${country.name} &#40;${country.code}&#41;`}
                              className="hover:bg-background/20 cursor-default px-2 py-2"
                            >
                              {country.name} &#40;{country.code}&#41;
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </Popover>
                    </>
                  )}
                </Select>
                <Input
                  id={field.name}
                  name={field.name}
                  value={rawPhoneInput}
                  onBlur={field.handleBlur}
                  onChange={(e) => setRawPhoneInput(e.target.value)}
                  className="w-full font-medium h-13 bg-[#0E1015] rounded-r-xl border-y-1 border-r-1 border-r-foreground/24 border-y-foreground/24 px-4"
                />
              </div>

              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <FieldError className="text-sm text-red-400">
                  {field.state.meta.errors[0]?.message}
                </FieldError>
              ) : null}
            </NumberField>
          )}
        />
      </div>
      <div>
        <form.Field
          name="workEmail"
          children={(field) => (
            <TextField
              isInvalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              className="flex flex-col gap-2"
            >
              <Label
                htmlFor={field.name}
                className="font-semibold text-sm text-[#999D9F]"
              >
                Work email
              </Label>
              <Input
                id={field.name}
                type="email"
                name="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-13 font-medium bg-[#0E1015] rounded-xl border-1 border-foreground/24 px-4"
              />

              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <FieldError className="text-sm text-red-400">
                  {field.state.meta.errors[0]?.message}
                </FieldError>
              ) : null}
            </TextField>
          )}
        />
      </div>
      <div className="lg:col-span-2">
        <form.Field
          name="wantsTo"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <RadioGroup
                className="flex flex-col gap-5"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(val) => field.handleChange(val)}
              >
                <Label
                  htmlFor={field.name}
                  className="font-semibold text-sm text-[#999D9F]"
                >
                  I want to
                </Label>
                <div className="flex flex-col lg:flex-row gap-x-10 gap-y-5">
                  {radioValues.map((val) => (
                    <Radio key={val} value={val}>
                      {({ isSelected }) => (
                        <div className="flex items-center gap-2 font-medium">
                          {isSelected ? (
                            <RadioCheckedIcon className="h-4 w-4 fill-foreground shrink-0" />
                          ) : (
                            <RadioUncheckedIcon className="h-4 w-4 fill-[#666666] shrink-0" />
                          )}
                          {val}
                        </div>
                      )}
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <div className="text-sm text-red-400">
                  {field.state.meta.errors[0]?.message}
                </div>
              ) : null}
            </div>
          )}
        />
      </div>
      <div className="lg:col-span-2">
        <form.Field
          name="tellUsMore"
          children={(field) => (
            <TextField
              isInvalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              className="flex flex-col gap-2"
            >
              <Label
                htmlFor={field.name}
                className="font-semibold text-sm text-[#999D9F]"
              >
                Tell us more
              </Label>
              <TextArea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Briefly describe your message here"
                className="h-60 font-medium bg-[#0E1015] rounded-xl border-1 border-foreground/24 px-6 py-6 overflow-y-scroll resize-none"
              />

              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <FieldError className="text-sm text-red-400">
                  {field.state.meta.errors[0]?.message}
                </FieldError>
              ) : null}
            </TextField>
          )}
        />
      </div>
      <div className="lg:col-span-2">
        <form.Field
          name="subscription"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  isSelected={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(val) => field.handleChange(val)}
                  aria-label="Subscribe to materials"
                >
                  {({ isSelected }) => (
                    <div>
                      {isSelected ? (
                        <CheckboxCheckedIcon className="h-4 w-4 fill-foreground shrink-0 mt-1" />
                      ) : (
                        <CheckboxUncheckedIcon className="h-4 w-4 fill-[#666666] shrink-0 mt-1" />
                      )}
                    </div>
                  )}
                </Checkbox>
                <span className="font-medium">
                  I want to subscribe to the occasional insightful materials
                  from GrowthOps. &#40;optional&#41;
                </span>
              </div>
              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <div className="text-sm text-red-400">
                  {field.state.meta.errors[0]?.message}
                </div>
              ) : null}
            </div>
          )}
        />
      </div>
      <div className="lg:col-span-2">
        <form.Field
          name="privacy"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  isSelected={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(val) => field.handleChange(val)}
                  aria-label="Privacy policy"
                >
                  {({ isSelected }) => (
                    <div>
                      {isSelected ? (
                        <CheckboxCheckedIcon className="h-4 w-4 fill-foreground shrink-0 mt-1" />
                      ) : (
                        <CheckboxUncheckedIcon className="h-4 w-4 fill-[#666666] shrink-0 mt-1" />
                      )}
                    </div>
                  )}
                </Checkbox>

                <span className="font-medium">
                  I have read and agree to the website&#39;s{' '}
                  <a href="#" target="_blank" className="underline font-bold">
                    privacy policy
                  </a>
                  .
                </span>
              </div>
              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <div className="text-sm text-red-400">
                  {field.state.meta.errors[0]?.message}
                </div>
              ) : null}
            </div>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <button
            type="submit"
            className="px-10 py-4 cursor-pointer bg-button-primary rounded-full w-fit font-extrabold text-lg justify-self-center lg:justify-self-start shadow-[0_0_16px_0_#FF336680] hover:bg-button-primary/80"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      />
    </form>
  )
}
