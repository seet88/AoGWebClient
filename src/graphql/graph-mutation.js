import { gql } from "@apollo/client";

export const GET_DATA_FROM_AOG = gql`
  subscription {
    dataFromAog {
      vehicle {
        lat
        heading
        lon
      }
      sections {
        sectionId
        pointLeft {
          lat
          lon
        }
        pointRight {
          lat
          lon
        }
        buttonState
        sectionNumber
        isSectionOn
      }
      dataInfo {
        timestamp
      }
      controlButtonsState {
        buttonManState
        buttonAutoState
        autoSteerButtonState
        uTurnButtonState
        lineABButtonState
        curveLineButtonState
        hydraulicLiftButtonState
        skipRowComboBoxState
        headlandButtonState
        distanceNavigationError
        vehicleSetSteerAngel
        vehicleActualSteerAngel
        isBoundaryOn
        isUTurnTriggered
        isOnField
        isJobOn
      }
    }
  }
`;
export const POST_CALL_ACTION_IN_AOG = gql`
  mutation ($name: String!, $params: String, $type: String) {
    postCallAction(actionName: $name, actionParams: $params, messageType: $type)
  }
`;
/*
export const POST_CALL_ACTION_IN_AOG = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;
*/
