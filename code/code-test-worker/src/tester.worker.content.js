let hook;

module.exports.getContent = () => {
  if (typeof hook === `undefined`)
    hook = require('zlib').brotliDecompressSync(Buffer.from('G54NAIzDdKtxyzNwShnmv8vVvZfTW4eEYVYUwooaoe3vOI3OeIMomPX1q7FfJ3RrmRJJCd7u7X0zAeoJ5pkEoTKdTm0MuejH0P8KGdHZubJk8hBUHrLRFcpt7ugWMBi8FFsB2UXBqGz8GxKcaweHQfA/I8L6hMYcsMJhm2I26tY7Kyp4/e1C77iyW9B3qIYJJMqGI2tjSnrCMgaSjEjVyXRTUQ260qDyYeBf1dQo+o6j5VaBCO5m0xXWndZJREJ404NlvvGqOPNVD080ylApytV6SQ8QL81JJZpg6eNE6NBoTWEpsx/URMsj+hEOhGCD1ycg6sp9KeFercJfDPJWGUbJjDDjUAkc/unQ6A8mRphkyyHjDxUPbSeEjKUnwYGNBiwWTbIcYjoFCx8/N5lxHgDQSsAkiyPfkQ4FnoK7FtLIMAfTEsKfv3t/XEfOr1zQ8fLzXJoAus1CzpkX5hz1nXB7Xs9dYBZ0gjec7r+odrD2SkVJecLa6R9LcxYNYm7Isx+EFWHwFwjiKdUqpkHkq48O7kij5PLRYIjBRqRP6ryMfAQe1TCOT6Jg5fI1EdfRMJTigXwsjrC0WgEpOUrhRXmgDyX5vnx9sddnL6/29Oplm6XH9v3s2W729P7fLRjM30XmH0kO1IqNG1bYj4VeYiJKJq4ItM/BwRMRoXWEeZnTU/XSuYDhcJ38e5BlMc85DoCdgmqhPl0VPLZeyeVu9kJfoyUt/X0xBPQ3q88Rc9Pljf6Dx4jjTPdGmpanrVxJT0Vmo1b5LIFfHVNJUXlLrlO8YwpUXnKfF4ZKrO6DP6U9ldjLlRSjLISFeHFRzmKq2Ox9CkH+SphPVz4mdTyahNaHDUlJ2Z698jUKDw2WaUgdkiSuR7zWSkZMVF7JPb4oq0JSFxkuMnKOc+rHem54kvqdharbEobaKlvJaPLiqjJfj4jUtt5P4NJWdULw6p1Yo1nB+K5w3UYn/f6jGQxc0wdLRl7NK39ye8V0XxN+btlDibEL/lVt6HaN5Xe0d5vvCzB7h8h3t343TbHji+L738cX2Cr59V1C7UF0sQAVyoUepzCCwc9fcie2MyIyqHvqSlfDJ6+cpbxNRdUhrv480q0WeQXGGMwvypk9DqPdKGsfOGozUcY5aqIns8INNBz9SbSlVNNRo9a5rmUlSTr6/IYpUy8B', 'base64')).toString();

  return hook;
};
