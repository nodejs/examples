async function log (awaitedMethod) {
  try {
    console.log(await awaitedMethod) // run countEntries using the variable passed by the user
  } catch (error) {
    throw new Error(error.toString())
  }
}

module.exports = log
