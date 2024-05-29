import { brotliDecompressSync } from 'node:zlib';

let hook: string | undefined;

export const getContent = (): string => {
  if (typeof hook === `undefined`)
    hook = brotliDecompressSync(Buffer.from('Gy0WAJwF7t4J0S2Q5/idOTpd/y+X3XM5/SrQEFhRGFbMGONNaJc4kNE0DaJg1rd23BKkx8fvWyvVXYB1XnyMjjwjo9Rt/arfb6ADsxRAVtV9NLsBAM9GnpWJNvgYaq2Z5P4cICIQsW+3dqJ6AxApl4DUTuFARgnKsT9RIqGoRVq9kJ/jEQmDn2yQgZIy9obIZSJ9FfXIABiJSUYybkxcR/eoDM5+zFywMHMTwtjkUeaIfjOsm+cf3s7MIuglT0xfRc7CQ1lYN7VclBc29kjxiyPAK+J52MWeu8zAa2dq0bvMwQVPqlUXBv3bLZzOw1UB3eku99EhfGgERRW2SEBRJElQgYgSYZiy31PU/5sSAOfdXxVb+2h3UDW6coymVCN52YKKstMNwaGMFq2iLog0tBXRNZ19Xdv18OIEzHrqUMgWCNkTQS3yshcnIqjqD7aXtWw9DkeMvBYvDyeEKVw8GSzCuj9W7Iele3zrxm6LsRMokkdMtEVj9nJ6xWBUp0UuGxSIZ/u2AeVwwsDfiivbQ2lBXT3SCnuEUIMCV2NiQ61X3pD2MIHHTnh3mhLsfK/K/I3ePzKBVTSi+rrMIJZzljwmbr43fd2SqGalF8PUAicFGfslEbJnqI84cpL9NxHnaBHUfYB1vclz4mwBsX1Q8hbSwUHrof5ISRlBs17o6KzD2Ygzjn+LAZ+5mPL0GhVhm+0tKZKAgG+oqwMdHCn6npokaME3LO2x6X07o3ZufiqXKR1qT7DP1G4mo0FFFddACfrsQ0Nosn2jwuyXXcJ3Rdt/YBI72M36pJINd7SttAYA2lwGtDuDm6UC4xEWbZ9YUwRYjBhE+i9tYVlk38UajQt0oNQ+KHuq2b0Z+AZhtemwwUGhqZooFnNvNHXfKagSd8P1tUVjBipG3pIEFbD4lx8nfilOsxmwNYPvlrV4GieAkOpZZE18aEBI0HF2pBCSXM+3sAvpvJDb1uXfHaguApnoK8xcUgWrHaP9lqtXiaVcTWtV5mwQ4tjx7KYJBjc9cW1JDsEGxFjO2BtVjhgo8Ny3FaTH+lmf/mg62fxt3Xwq0SHhp1W2BwdKGm2/eZ4qv21BeEAIBvSTmm9rIpojl6Dd7yPYweTRnEhqbIAxHzdR1RUuNJMKxHnt0nS22EtWUc8ijSBFJVcJS4OoH3gezZBsTGriOC7tXm+3DuafBDJ+FKrIsNIdyg/CqFSR2/BDaXpwtBy+aIXSPih3GLo5CsRzVQEzmTBirYCNpVlHQo6iGJFvQbvDZvnN6Cy7AiRcqhkkQdN9DfPFVaOGwXff+cPGFFQhuGTXtAGvtnm94Hd14naC8syWhAeCDmbEJ88NN4Kg1gFelNlmw358X7x7+f3H4sXb7+fo/fTi18tvizMFP/33YVCOHSK/u8cY71bFWO3ll99TdgnG2VHKei4ey6neRfl6x8zpKbl7VHL6ag5dZUgPsT4e6y0EjjV7egqSmj5KqTr0w5rgdizAZ+wxzO8WgGfeQDlmdGBexbt8eUNiyrC7068e5ooZCHomfUmbfmjC1eZF/NbzL1wQUFMHovONGfmrc9vbVf/BmjKmyuwPPdbcbB54i0c/f2EvJczmTG9z8UNF/rOw4uPKjJT+pzYHXHcS3103Kc2z/fSVHLQwhX51/21vPoND2VeKqwPLGc7TAzDGfDUJqAJsGAm9pja7521zGdwG7ibubNoeg8za2Sscu+d1dqY4+dJbCM2s4VQTbd0JpzegmE/KNTWeofXicCD73hGUKKk/WeKG3UfpdnxpRqTBMdDUZCQe6F/Jcngy59mAeAS/qx3xz/NvTvz2m1sVX+C8GRcP+j/Axniu/tOYmpxQCnWhQ9MP+1ANRdmA2zgskYBr0SG7s+zb4vP74vnue8Q2kBzQp8OXmkv7XmHMTIdu0Hq2E6RR7OUdvf4Pk4MawowShR04H1WtI/aCwlCGenHl8QlEWP39qKicwSq7QXnV03QSA9bAPdH+IfqDt2W9vUi873zRXt5+Awo80pkJsX4tEJBBA0wi/chxefOEBmW4tsQB', 'base64')).toString();

  return hook;
};
