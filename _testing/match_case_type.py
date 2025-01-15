a = None
b = 34
c = "delulu"

def main(k: int | str | None):
    match k:
        case int():
            print("int")
        case str(): 
            print("str")
        case None:
            print("None")

main(a)
main(b)
main(c)
