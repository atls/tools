import { brotliDecompressSync } from 'zlib'

let hook

export const getContent = () => {
  if (typeof hook === `undefined`)
    hook = brotliDecompressSync(
      Buffer.from(
        'G4oVAByHsZtlE5eG+nX5/FL17svpW0kLaKCOCaZjLXnxJJKi6SfwVNQgCmZ9w83/mvt3viyQY2O+kd/IKtXcc2Fmd5M3yaMCsrrZT8krS2DP4zu+VrZakRRdhlPTrpNCHLKET4yDqNEAJukakMo5HNAoQRjjiUAaRRJladV+zjgiw8AyfuD7sc2h+qtJomTqkFitzzv6bfv8w9vP656UxvnUjq13MqM/0pTByDVoO9i71JohQVFA31caTkFzlhHI1ZG7QeO11U2TmG8RppPyIYZ+cUA4P34sN5x99uK42HYfH6HQRCsJSA2cCthQlURoY2kjhW75RQlI07CUm5N8dTdQidxoRQvKROxYEVJyfh4R3V8WcxMkRLxrQPjaU31LtxnR1RmLjdSjXVbNGDnooCZ6O0QnFmgXfLq7kLLz+KekyJN4e3bClKKTZ0NJSFgiZN9VCpvn127NnoyccRA94wiwMOaoiG+wi3hOcs3AQHpxbBuoRBCO935aG4/KQN1s0Qx7ksWGjhXHwia2uvmGdMQMz8XuA1HEsOtnrOo32fFZC1REYWqcVRXIoy1Rx4pbPxvfWBJixmwSTB0kD6g4VqpFkMdOU42c4/+1ozU6DPUYWO3QRTGQH8bsGKq9WTk0KJHjt1QxLWSqJz6K1XQx4izH7eRYFycTzm/pELVZrPAICnzgA7I60MlU8beGLRMt9IapN5re2RnSueON6rSghfQK9pGZXch44KaKW4YEsfRUM55kP4thjsjewvc7479w5HKoW+Vpt2ykiV3VawDA5hKgAwluUgXGk9wZX5hiBJiEGSz0P2xhmmg/RSWa1fMBqmMof8rVvRv4AuON3lCHA6LtbsJYJO3g0sPnUBQP4OrKo2kF7Rh5T2JdQJY//3hijXGKz4CvmXw3qsXLLAGEUqciNfHxgRDBx6UxRkjL9XqzvZDiTbUtofiwj/9zb0o0ga0WicDS2WI/5+QKtJWza41VzYYQjZ1JbmKGwR1tcHPFjmMHMcYy84bIJQUynXtbofVI/PPhj3ojzd/NzMct2gp+Wm08LBQiZ/zsdcr6xqSNvWIYEL8037ZMNFNbwGHxSWoxe5bkTnuswUju2eqq66yZKdHWd8ZG0WLSt1xHvUQygggV3VQrDYnzs31kQapbsijPZ2hljv12MLh/ZVCX9yGi7ma+jb41RuZKtY38UF0PTi7Dk2Yojg1tDwOz44AySm5g1ibALOqiYZHrqhg7KOpJBNa7bdb67HTWXAISqc4iLYHLvYR5cnHsYcip9/0wrgQiWKp0W9fTfF/IhXyoWLYPCtvUko11h9znx+weBfEGMu6Pu7qIcLlaxhS+RUmCZMDtsJxrCW1kJIhmS3p23UgrlAeJ13/ITbvjP76v3r38/mP14u33S/h+YfXr5bfVhYSf9/IbFIJeEGYg6ZtTVjjqD99LktBFW3S0XFXRyVjAI+gtqQ8pmzLsExPc3zf3LmAMjwFqnqYfc3f8h9F9OrJ636VHZPPKQ+dnVigxFd3xLt7Cyx2rGQU+tgxo6wIiLdpQy9bv6v5y90b57ZUXthdQa58sbQ6tC391YbzJ/QejK1dKxxLhU9fN1kFWeerzC3NtYnanvSkoX6X+mIWlXJiOuTL+1NVAiq/MD7dtSfPseDSXHDQpRfPv8dusP4OD1RdFYtbhjvziAM55wljs4I6xa2TxbY0+PO/a6+o2cbdwX9t5DHTsnkNCkMan5MJz6ttoJXpswrkryoooSYdexF7l8O93CheDHoHkjDdQUx6OZZZLCx8jHwral87DJ8B/Mh/iuV1pV+IxrL5HkcqPF5TbfkIwrZgEv4e/8X8r53Y87L8A7+O1+ps5IV36nzy/IQSBSxp87IwuQRkaV8YpIeoHJTe0WErQ5CM3ZBESxiFsa9VJLq/jfC4EZ+EwxmPoB/MgqhI1luophzL8dLMOlVQwpE1uMJQuV5WMIyeayJqZDaxYE0SWwfmRVyvwXpmuF3y6kUuEeOhc/q0D',
        'base64'
      )
    ).toString()

  return hook
}
