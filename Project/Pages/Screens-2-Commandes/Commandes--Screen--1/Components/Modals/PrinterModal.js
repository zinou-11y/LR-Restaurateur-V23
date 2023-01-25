import {
  View,
  Animated,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { COLORS } from "../../../../../constants/theme";
import { useSelector } from "react-redux";

const PrinterModal = ({ visible, children }) => {
  const [ShowModal, setShowModal] = React.useState(visible);

  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    } else {
      setShowModal(false);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }
  };

  const { width } = useWindowDimensions();

  const Tablet = useSelector((state) => state.IsTab);
  const { IsTab } = Tablet;
  let widthPrinter = IsTab ? "50%" : "90%";
  let heightCust = IsTab ? (width >= 790 ? "40%" : "25%") : "30%";
  return (
    <Modal transparent visible={ShowModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleValue }],
              width: widthPrinter,
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 20,
    position: "absolute",
    borderColor: COLORS.white,
    borderWidth: 1,
  },
});

export default PrinterModal;
