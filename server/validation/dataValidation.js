import vine from '@vinejs/vine'

export const schema = vine.object({
  username: vine.string().minLength(3).maxLength(255),
  language: vine.enum(['C++', 'Python', 'Java', 'Javascript']),
  code: vine.string().maxLength(10000),
  stdin: vine.string().maxLength(10000),
})

