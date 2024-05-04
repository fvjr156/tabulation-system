def hash():
    import hashlib as hash

    while True:
        print("Type your text")
        plaintext = input("")
        if plaintext == "":
            return
        print("Your text: "+plaintext)

        plaintext_bytes = plaintext.encode('utf-8')

        hashedbytes = hash.sha256(plaintext_bytes)
        output = hashedbytes.hexdigest()

        print("Hashed Text:")
        print(output)

hash()