import { brotliDecompressSync } from 'zlib';

let hook;

export const getContent = () => {
  if (typeof hook === `undefined`)
    hook = brotliDecompressSync(Buffer.from('G9MqQDwM8GRn9MogSYUBCS6CObIpV5nq++1mihshyey1VPvr89ooReBwkNJJqVfLy6PxYbR2sAoadp0ucMLxEgoswKtcVwkpJto2rXyR5BVYC0dHJrHNPKiFTxAFMzcVz6ttgEj0O7tMkB6fDBr6gjpZDGoVuXI279fv16cNkCQfHyFJRUe4KLOvz+nuqgfzqwZ2lgBu33dn82aXAwAOWCjyMTJGJDZCxbkNlDdj20IlpXtbh1pK941+X1KP4YUxJBDSpqxCTRVIlPc/qts3kGUEdVqbqOkt4dCnnWjPbips8cVJFoDEGBsnowvxJvxkggpvSZidD1rb9ofgbMz8Ks7JRivAXlbr9T3FHeegHlybrqcECEyWcdYnoMq9/kRuJVem/towe4b+17oB0Mw0qkQTLRVnSntkwfkCsSnkra+1MmBM3ZI6obfhJU5LGF+2sFNLiTEqEOlGOdCEp47UIwHD5ysFVReeYuwBeLJ1sCmePJCTsYEAdzlt5Kx/Wj66Pc54HLjvToBu7ekVsiJZJiIMgdYtFOmHy2V6zyd8RKJb/5EJa7EiKaeV2usWTQ7hvcoo9ppqx4C5OVjPc7lBhj0C9j00Y+6QiuaOZvAaK/9OLFlfqMJU/dZvbkrYdm32oSfj76TOxqCSNBvvvcUsFUpYIft1/GjTEUw24zvh6JWilGD4pRaI2W09eezV946E3knAuKrnE66rFXtxUmcAbXNfyE+rf99mr8xODAQvVFR7Xg4Qu+GZWMd+JHVud4VYim3cKwQxul7AaRJxtXdG3WuWGVBIDffhkPBpKoO3ZOVPuz+vgHeLNBtLWpRToIqK3TuCCvF8JinSgocxNtvU73V35BvWEKewlZuo15jXGyLPIDgTS6Osj6GME/B2aEL2alV03EkKncI30lfuUjAYP1dLVACn8I/wenOSvo6kbl0vzA1QxkxCGFLWut+mHADfevi/2TP19mwR7UjMAOr6Vpf1PyGqxYClWd1DweJwFRuFfqmANIG3KRUnVBwcFCr0NpWaFyCVm6y1Pj1JqvndRejsehhhgLy5Y3hkuKqFjtOwNnW4MRXy2h1vQzV+su7fI3u5DV5gF5RctcRwJ6K4xJOUou5oJebjG663iT8cJB712Z3/kQYZBCAk5EeQKKXNu6r6SMZHJWT8e0nC2AvOrNvWnF1x0Dk0+/EYOgMZMur94onUCt3bLbVZ3vWUzaYHaUwQApL9rTImNZO1jsoisFejdNot9vica1fU+Bt55roMDNpfpNqxuyqSJpM1KnlueDDmRYqYcVjBs+KCD8cvS4WoXtQIIxUhoVZiuEaSGHgs2eiet/1hoWly7p0TrehWjx7QN/CXRdYM+ctFvHGDPDM1vkuFULqzH3OzIOAnxjri15+8dMJHTyboAJfiwqqbvxoWKSI3/fiuezwlufOj0K6vklwz/4wdHi3Byjwb5l6OFfqGaY41aoKOAybkvdXuBiL3CX2P3eoUMciqrCnDZ8EZB/OIUvDIRdDH3ooj2M6aSq8u3pkJ0zE6NGGTuUV7judFaLOFFJ5pnhHi8R15Oz7zrevvK4sM9KIooKywYJeThX6j8zy37YL5pSwzcEeEl4p9yjzw/XK6n77GJsX9i820iVMz3d/+2OrpYeFts/If9m6ZslLHH0f0MXy31z15E4xtTP198GYufmqQgiVDzhl6QatfiXE3oRsnLFz3T+ze7YUVXciiSb4u0ohe+/UsJgvgpO6d+pMdud1NdnV4hDp0sSaC+Os0aXVRYf4WpSd0/lBnAsk937hs1GtrJyGzh5CoM5j/5dCxcg3gsIssJ8Fn9F7nYJB/7tQByq8tmtjhPxokWp/FV/mx8lNnVgOKjl0bDQIVQ8xeizzNsygPSh6rr2Ne3YZYEpzw/jIKbomjhVSkXw0D+AS2VmxJnzPU/cQz0AXax847FkFZSzLInUhLxLNzuawsTqC5MXcEuwkibS0hllDhn3x3K066qBhxIiEuuA0ZTUQSVqY+CIJrLq0EqGIhYjZPLDvvgcWaZam72xiuJHFixpk1OkqMIHs1XxXviQCtKA3iELmDRJLkau4h+J3D1fVAbvskrTSVrimMXmWrmr3soGRTVo0rZGdY+5tWXQnZZDQkoXb2gwzDV6lgniDgLZ+eNcJGluSnWqSfAe7SRHeYQytZbbYOCC590b1IORouMVDs4kMw66oGRdEB8Zg/+1ezjf0D1svL+B8L91zcookuw36eY9jbimbAvG2zhDBUMNRRewTes1xfMAzMKeQR0kH4IqsCvRU4eqscebzNk3DHQNgFjAsCOS6sco4FZ91E9ctRxLeuSNh3OgEQ9IS8E12ptaNpSNsVsNiKRqbQQKtmUm9yui9Fnay1mOQ84YX/UlQ/zHiPzyXAXnJC6ITwxmZD2USfoydzpRN4Kle5aBoESZfFW0gBy8sykgYerk/KYRGrn/lxmFmp+BLjKy7rQrjVTIuFFHTUODf+5b96TAogDhzkfnPtCmkPFpwlRr44TwH01vXLfAVc3rmy1zAjrqqtgdG8u+nU/e9iyib9hOyJ8KFmFtfXVFPcCE966biyV4C1CVlnUBEg4bCcsoWSeWrL8Uyb9lO17+UA1UDNTK0NzfQsmuhvE+NuuKKqpWFVafScvCqwvkzBntkqNmVQrlQti1P8ThZSRlIC2Jy+FWuzwwwAFra5Wq56dvku2k0DkI+2XU0jKOmt+8VEYDg1Lvoek5rHxT/YYaQtNRda45N3I1o/6yBqUxBl+Zuund7gdWJFZUBPaZYqqGOmQSKzOxQdZohFPzzChybbgL/Vf+NiQe4ayhfUuWu9FnNfcXQ5mby7mk/zZGQWMXxILBbUBDF90OrAHZblndT2ocH0obLB+Y8AmjA9Mcir2ObKkw06XMkqLmOUvfV5qUL/OWwD36KPyXFM35Bd5dg1HCNI2oqoDZ70Ca18DmKJ4tpSkPgal+6IvSdaCf/Dm9hRIMaObxyFbv6J96HB765FQGyAk+EC3oqJiMivjUxEGV+2LyaDDaw7YcaPqL8zz9O4iwMkaFMmRkuYfmK7JMRv4f7Op+2b4ANf8Tylfrp9oBJ/GSghdxv/o20U4yE8h2Qwh/jzDX1C5mcC2Whq4ygEP23QlxE6KKHw+A7EKXh2s0qibvXl5cNLyqsheKdvrhd4XsxqGitljHZ80MvaBT0NLELQ76Pikm9Dwk/VpgrEeT34+XvG2F/hiUHAYd4mrXHrvLG2nVAwItd/g5I3o5EZaerRa/Z5UUZitIUXnd8ckK7yC3IZZKXyjHRmEFY+LJfbezP56Z/p6W/8TGsWfCtgz083G+9PvIVt/fGWuRNobVuLWx9Kx/5AaNTt5GmjZeVFTJ18NC6XqiXvPGRV9Qb3Rj3i7A1U6635bUMq2h+w32j0gp7yxkAr+Gb8tE+MuO9/emj3WA3cl5ULsQPt1cmPZuMrN41bUsSIl70SFuSbTGklRr/HyrO3z6XE/aST0E+5JsqrDslGo3/3TuXCf2F34aX84pfaSo4M45LzugOTHnfxpfzSt8yfokTmkvkt7BwJsG05rla0sm1mYM/rmWZZMAEgxq/iHlOb6NC3TmTDHryepcdpyf4usXisEgl9oyqyFuDV5iB0Et64Qe7o1Hxqjba9hxubjK1H5DqY9SbyXjCNaEAyFBsV8yYkZBuOf0sqZnmzd0d52/6MRWfo95NBi7a2EfRWwU4bU+SEoZIq+s5zt+1rmN4EZG3m/8CWjBllqDtYnrs4X/0wilIsrtT2kpzWM3lA/QenrJ9y/oLgTnQlQwqSFo8NdJvSsgu1XtE11GmaPxS6+d8ySmsbc0gxoOfY02u1bvckBYe5DjXqhTB7xE6NKB1Fy8CliE46xbsN3BabEfg1L3nIxY9DWU6LarR0150IoU+bl+2JVfgwN6D21iv4enfL3VvX/xAkU0sqEjRKIYQaVNVgCDrtXiso/TIZlQVWDy0q+1ii5TLYaF2R9zTnCzWS3AWbKROqpyRKlF4/VPB2IQWG3H1/JmUYB7I/UydAamPxDFwfgxlYZN5C//Y1KJWBDNTTvK3dF41Mlkv6kZunjClApILySDfVPoIOguFajiNgqfW8VyvIfjXKM3/grVW/OoM647BEGgs3anSNdK29DW6dRBw8CTp8AT4JvE1XgQAMM/nBcE4Ug5TPrEjbpI/mip1lZR+OtARsRVJqZzK2xDRm07JMqbcyaWtVy33cNmTqUPYmvUPlhabqB2tO++f9LWLE6sxsCzwUmRuuwNFdhVba7wE=', 'base64')).toString();

  return hook;
};