import "@stdlib/deploy";

// See example from https://docs.tact-lang.org/book/assembly-functions/#keccak256

// Computes and returns the Keccak-256 hash as an 256-bit unsigned `Int`
// from a passed `Slice` `s`. Uses the Ethereum-compatible implementation.
asm fun keccak256(s: Slice): Int {
    // s:Slice → s:Slice, 1
    // —————————————————————
    // s0      → s1       s0
    ONE

    // s:Slice, 1  → h:Int
    // ———————————————————
    // s1       s0 → s0
    HASHEXT_KECCAK256
}

contract Keccak256BugReport with Deployable {
    get fun keccak256(data: String): Int {
        return keccak256(data.asSlice());
    }
}