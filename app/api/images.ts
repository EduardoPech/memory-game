async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_IMAGES || "");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export { getData };
