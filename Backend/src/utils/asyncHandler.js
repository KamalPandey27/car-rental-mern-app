export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      name: error.name,
      success: false,
      message: error.message,
      statusCode: error.statusCode || 500,
      error: error,
      errors: error.errors || [],
      errorStack: error.stack,
    });
  }
};
