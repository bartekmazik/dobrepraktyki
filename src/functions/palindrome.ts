function isPalindrome(slowo: any) {
  const reversed = slowo.toUpperCase().split("").reverse();

  return reversed.join("").replaceAll(" ", "") ===
    slowo.toUpperCase().replaceAll(" ", "")
    ? true
    : false;
}

export default isPalindrome;
