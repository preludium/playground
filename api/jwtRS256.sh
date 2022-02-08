ssh-keygen -t rsa -b 4096 -m PEM -f access.key
echo "access.key generated"
# Don't add passphrase
openssl rsa -in access.key -pubout -outform PEM -out access.key.pub
echo "access.key.pub generated"

ssh-keygen -t rsa -b 4096 -m PEM -f refresh.key
echo "refresh.key generated"
# Don't add passphrase
openssl rsa -in refresh.key -pubout -outform PEM -out refresh.key.pub
echo "refresh.key.pub generated"
