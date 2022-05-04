// Function to update a mower's orientation
const updateMowersOrientation = (mowerOrientation, action) => {
  if (action === "G") {
    switch (mowerOrientation) {
      case "N":
        return "W";
      case "W":
        return "S";
      case "S":
        return "E";
      case "E":
        return "N";
      default:
        console.error(
          "ERROR: the current orientation of the mower is incorrect"
        );
    }
  } else if (action === "D") {
    switch (mowerOrientation) {
      case "N":
        return "E";
      case "W":
        return "N";
      case "S":
        return "W";
      case "E":
        return "S";
      default:
        console.error(
          "ERROR: the current orientation of the mower is incorrect"
        );
    }
  } else {
    console.error("ERROR: function accepts only 'D' or 'G' as an action!");
  }
};

//Function to update a mower's position
const updateMowersPosition = (
  mowerPosition,
  mowerOrientation,
  topRightCornerPosition
) => {
  // Return the same position if the mower is already at the right border or else the position at x + 1
  if (mowerOrientation === "E") {
    return mowerPosition[0] === topRightCornerPosition[0]
      ? mowerPosition
      : [mowerPosition[0] + 1, mowerPosition[1]];
  }
  // Return the same position if the mower is already at the left border or else the position at x - 1
  else if (mowerOrientation === "W") {
    return mowerPosition[0] === 0
      ? mowerPosition
      : [mowerPosition[0] - 1, mowerPosition[1]];
  }
  // Return the same position if the mower is already at the top border or else the position at y + 1
  else if (mowerOrientation === "N") {
    return mowerPosition[1] === topRightCornerPosition[1]
      ? mowerPosition
      : [mowerPosition[0], mowerPosition[1] + 1];
  }
  // Return the same position if the mower is already at the bottom border or else the position at y - 1
  else if (mowerOrientation === "S") {
    return mowerPosition[1] === 0
      ? mowerPosition
      : [mowerPosition[0], mowerPosition[1] - 1];
  }
  // Else there is an error
  else {
    console.error(
      "ERROR: input provided should be either 'N', 'S', 'W' or 'E'!"
    );
  }
};

const moveMowerOnGrid = (
  mowerInititalPositionAndOrientation,
  mowerMoves,
  topRightCornerPosition
) => {
  // Set the mower's initial position and orientation
  let mowerPosition = mowerInititalPositionAndOrientation.splice(0, 2);
  let mowerOrientation =
    mowerInititalPositionAndOrientation[
      mowerInititalPositionAndOrientation.length - 1
    ];

  // Loop over the first mower moves and orientations
  for (let i = 0; i < mowerMoves.length; i++) {
    if (mowerMoves[i] === "G") {
      mowerOrientation = updateMowersOrientation(mowerOrientation, "G");
    } else if (mowerMoves[i] === "D") {
      mowerOrientation = updateMowersOrientation(mowerOrientation, "D");
    } else if (mowerMoves[i] === "A") {
      mowerPosition = updateMowersPosition(
        mowerPosition,
        mowerOrientation,
        topRightCornerPosition
      );
    } else {
      console.error("Please provide only 'D', 'G' or 'A' instructions");
    }
  }

  // Return the final position and orientation
  return `${mowerPosition[0]}${mowerPosition[1]}${mowerOrientation}`;
};

const returnAllMowersPositions = (
  topRightCornerPosition,
  firstMowerInitialPositionAndOrientation,
  firstMowerMoves,
  secondMowerInitialPositionAndOrientation,
  secondMowerMoves
) => {
  // Prevent wrong topRightCornerPosition entries
  if (topRightCornerPosition[0] < 0 || topRightCornerPosition[1] < 0) {
    console.error("ERROR: please enter coordinates superior to zero");
    // Prevent wrong firstMowerInitialPosition or secondMowerInitialPosition entries
  } else if (
    firstMowerInitialPositionAndOrientation[0] > topRightCornerPosition[0] ||
    firstMowerInitialPositionAndOrientation[1] > topRightCornerPosition[1] ||
    secondMowerInitialPositionAndOrientation[0] > topRightCornerPosition[0] ||
    secondMowerInitialPositionAndOrientation[1] > topRightCornerPosition[1]
  ) {
    console.error(
      "The starting coordinates of the mower need to be within the field"
    );
  } else {
    // Return the mowers positions
    return `${moveMowerOnGrid(
      firstMowerInitialPositionAndOrientation,
      firstMowerMoves,
      topRightCornerPosition
    )}\n${moveMowerOnGrid(
      secondMowerInitialPositionAndOrientation,
      secondMowerMoves,
      topRightCornerPosition
    )}`;
  }
};

console.log(
  returnAllMowersPositions(
    [5, 5],
    [4, 4, "S"],
    "GADDAAGADAA",
    [2, 2, "N"],
    "AADGGDADGA"
  )
);
