class AssertionError extends Error {}

function assert(cond, msg) {
    if (msg === undefined) {
        msg = "Assertion failed";
    }
    if (!cond) {
        throw new AssertionError(msg);
    }
}

function deep_eq(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a !== typeof b) {
        console.error("expected", typeof b, "got", typeof a);
        return false;
    }
    if (
        (typeof a == "string" || typeof a == "number") &&
        (typeof b == "string" || typeof b == "number")
    ) {
        console.error("expected", JSON.stringify(b), "got", JSON.stringify(a));
        return false;
    }
    if (a == null || b == null) {
        if (a == null) {
            console.error("expected", JSON.stringify(b), "got nothing");
        } else {
            console.error("expected nothing, got", JSON.stringify(b));
        }
        return false;
    }
    const a_keys = Object.keys(a).sort();
    const b_keys = Object.keys(b).sort();
    if (a_keys.length !== b_keys.length) {
        console.error("object structure is not as expected");
        return false;
    }
    for (let i = 0; i < a_keys.length; i++) {
        if (a_keys[i] !== b_keys[i]) {
            console.error("object structure is not as expected");
            return false;
        }
        if (!deep_eq(a[a_keys[i]], b[b_keys[i]])) {
            return false;
        }
    }
    return true;
}

function assert_eq(a, b, msg="Wrong answer") { assert(deep_eq(a, b), msg); }
function assert_ne(a, b, msg) { assert(!deep_eq(a, b), msg); }

function test(name, fn) {
    try {
        fn();
        console.log("\x1b[32m ✔️ PASS\x1b[0m:", name);
    } catch (e) {
        console.log(`\x1b[31m ❌ FAIL\x1b[0m(${name}):`, e.message);
    }
}

function test_file(name, fn) {
    try {
        fn(require("./" + name + ".mjs").default);
        console.log("\x1b[32m ✔️ PASS\x1b[0m:", name);
    } catch (e) {
        console.log(`\x1b[31m ❌ FAIL\x1b[0m(${name}):`, e.message);
    }
}

test_file("1", (f) => {
    assert_eq(f(), "Hello world");
})

test_file("2", (f) => {
    assert_eq(f(), [1, 2, 3]);
})

test_file("3", (f) => {
    assert_eq(f([1, 2, 3]), [2, 4, 6]);
    assert_eq(f(new Array(10).fill().map((_, i) => i)), new Array(10).fill().map((_, i) => i * 2));
})

test_file("4", (f) => {
    const iter = f(10);
    for (let i = 0; i < 10; i++) {
        assert_eq(iter[i](), i, `Wrong answer in i=${i}`);
    }
})

test_file("5", (f) => {
    assert_eq(f([1, 2, 3, 4]), 10);
    assert_eq(f([1, "2", 3, 4]), 8);
    assert_eq(f([1, "2", true, 4]), 5);
    assert_eq(f([1, "2", true, 4, new Date, {}]), 5);
})

test_file("6", (f) => {
    assert_eq(f(10), [1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz"]);
    assert_eq(f(100), [1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",11,"fizz",13,14,"fizzbuzz",16,17,"fizz",19,"buzz","fizz",22,23,"fizz","buzz",26,"fizz",28,29,"fizzbuzz",31,32,"fizz",34,"buzz","fizz",37,38,"fizz","buzz",41,"fizz",43,44,"fizzbuzz",46,47,"fizz",49,"buzz","fizz",52,53,"fizz","buzz",56,"fizz",58,59,"fizzbuzz",61,62,"fizz",64,"buzz","fizz",67,68,"fizz","buzz",71,"fizz",73,74,"fizzbuzz",76,77,"fizz",79,"buzz","fizz",82,83,"fizz","buzz",86,"fizz",88,89,"fizzbuzz",91,92,"fizz",94,"buzz","fizz",97,98,"fizz","buzz"] );
})

test_file("7", (f) => {
    assert_eq(f("ilya"), "Hello, ilya!");
})

test_file("8", (f) => {
    const args = [1, 2, 3];
    const expected = [3, 4, 5];
    const ff = f((x) => x + 1);
    for (let i = 0; i < args.length; i++) {
        assert_eq(ff(args[i]), expected[i]);
    }
})
