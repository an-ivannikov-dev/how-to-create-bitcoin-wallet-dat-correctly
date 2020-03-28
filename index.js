const Mnemonic = require('bitcore-mnemonic');


const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
const phrase = mnemonic.phrase;
const seed = mnemonic.toSeed().toString('hex');

const HDPrivateKey = mnemonic.toHDPrivateKey();
const xpriv = HDPrivateKey.toString();
const hdseed = HDPrivateKey.privateKey.toWIF();

console.log(`
  BIP39 Mnemonic:  "${phrase}"
  BIP39 Seed:      ${seed}
  BIP32 Root Key:  ${xpriv}
  Bitcoin HD Seed: ${hdseed}
`);
// BIP32 Root Key (extended private masterkey)

console.log(`
# Создание нового кошелька (Используя bitcoin-qt, bitcoin-cli, json-rpc):
# Команда: 'createwallet "wallet_name" ( disable_private_keys blank "passphrase" avoid_reuse )'
# * Заменяем на свое имя кошелька и на свой пароль
createwallet "my_wallet" false true "my_passphrase"
#
# Переключаем кошелек в консоли с "default wallet" на "my_wallet"
#
# Разблокируем кошелек
# Команда: 'walletpassphrase "passphrase" timeout'
# * timeout в секундах
walletpassphrase "my_passphrase" 60
#
# Устанавливаем Bitcoin HD Seed
# Команда: 'sethdseed ( newkeypool "seed" )'
sethdseed true ${hdseed}
#
# Чтобы не потерять кошелек подключаем его в 'bitcoin.conf'
# 'wallet=my_wallet'
# или руками заменяем стандартный кошелек.
# !Обязательно откройте и закройте кошелек чтобы удостовериться в правильности пароля и том что вы сохранили нужный кошелек!
`);

/*
# Восстановление
https://bip32jp.github.io/english/
*/
