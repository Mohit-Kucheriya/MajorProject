// Function to handle our Asynchronous Error
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}