import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  Modal,
  Animated,
  Platform,
  Button,
  Pressable,
} from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { QuizListElement, UserModal } from "../../components";
import { constants, colors, sizes } from "../../constants";
import styles from "./HomeScreen.styles";
import { Brandon, Jennifer, Ewa } from "../../assets/data/cards";
import Carousel from "react-native-snap-carousel";
import StateContext from "../../assets/data/StateContext";

export class FeaturedCarousel extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 240, width: "50%", marginBottom: 27 }}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg",
          }}
          style={{ height: 220, width: "100%", borderRadius: 12 }}
        />
        <Text style={styles.title}>"Hahah"</Text>
      </View>
    );
  };

  static contextType = StateContext;

  render() {
    const [{ shops }] = this.context;
    return (
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={shops}
        renderItem={this._renderItem}
        sliderWidth={constants.deviceHeight - 99}
        itemWidth={constants.deviceHeight - 99}
        layout="default"
        autoplay
        layoutCardOffset={18}
        loop
      />
    );
  }
}

const { event, ValueXY } = Animated;
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLayout: {
        height: 0,
      },
      contentHeight: {},
      modalVisible: false,
    };
    this.scrollY = new ValueXY();
  }

  componentDidMount() {
    this.scrollY.y.addListener(({ value }) => (this._value = value));
  }

  componentWillUnmount() {
    this.scrollY.y.removeListener();
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  setHeaderSize = (headerLayout) => this.setState({ headerLayout });

  openUserModal = (userSelected) => {
    this.setState({ userSelected }, () => this.setModalVisible(true));
  };

  scrollPosition = (value) => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderHeader = () => (
    <View style={[styles.headerWrapper, styles.homeScreenHeader]}>
      <Text style={styles.message}>Artik</Text>
    </View>
  );

  renderForeground = () => {
    const message = "Artik";
    const startSize = constants.responsiveWidth(18);
    const endSize = constants.responsiveWidth(10);
    const [startImgFade, finishImgFade] = [
      this.scrollPosition(22),
      this.scrollPosition(27),
    ];
    const [startImgSize, finishImgSize] = [
      this.scrollPosition(30),
      this.scrollPosition(40),
    ];
    const [startTitleFade, finishTitleFade] = [
      this.scrollPosition(25),
      this.scrollPosition(45),
    ];

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startImgFade, finishImgFade],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageSize = this.scrollY.y.interpolate({
      inputRange: [0, startImgSize, finishImgSize],
      outputRange: [startSize, startSize, endSize],
      extrapolate: "clamp",
    });
    const titleOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startTitleFade, finishTitleFade],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.foreground}>
        <Animated.View
          style={[styles.messageContainer, { opacity: titleOpacity }]}
        >
          <Text style={styles.subMsg}>Discover products</Text>
          <Text style={styles.headerDesc}>
            Find an amazing curation of local, unique, hand crafted and
            customizable items.
          </Text>
        </Animated.View>
        <Animated.View style={{ opacity: imageOpacity }}>
          <Pressable
            onPress={() => this.props.navigation.navigate("Discover")}
            style={{ marginTop: 18, marginBottom: 66 }}
          >
            <View
              style={{
                backgroundColor: colors.primaryGreen,
                padding: 12,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center" }}>Explore</Text>
            </View>
          </Pressable>
          {/* <FeaturedCarousel /> */}
        </Animated.View>
      </View>
    );
  };

  renderQuizElements = (title) => {
    // const [{ shops }] = this.context;
    const users = [];
    console.log(users);
    const {
      navigation: { navigate },
    } = this.props;

    return users.map(
      (user) =>
        (title === "Favorites" || title === user.type) && (
          <QuizListElement
            key={user.id}
            elements={user.cardsAmount}
            authorName={user.author}
            mainText={user.label}
            labelText={user.type}
            imageSource={user.image}
            onPress={() => navigate("Card", { user })}
            pressUser={() => this.openUserModal(user)}
          />
        )
    );
  };

  calcMargin = (title) => {
    const { contentHeight } = this.state;
    let marginBottom = 50;

    if (contentHeight[title]) {
      const padding = 24;
      const isBigContent = constants.deviceHeight - contentHeight[title] < 0;

      if (isBigContent) {
        return marginBottom;
      }

      marginBottom =
        constants.deviceHeight -
        padding * 2 -
        sizes.headerHeight -
        contentHeight[title];

      return marginBottom > 0 ? marginBottom : 0;
    }

    return marginBottom;
  };

  onLayoutContent = (e, title) => {
    const { contentHeight } = this.state;
    const contentHeightTmp = { ...contentHeight };
    contentHeightTmp[title] = e.nativeEvent.layout.height;

    this.setState({
      contentHeight: { ...contentHeightTmp },
    });
  };

  renderContent = (title) => {
    const marginBottom = Platform.select({
      ios: this.calcMargin(title),
      android: 0,
    });

    return (
      <View
        onLayout={(e) => this.onLayoutContent(e, title)}
        style={[styles.content, { marginBottom }]}
      >
        {this.renderModal()}
        <Text style={styles.contentText}>{title}</Text>
        {this.renderQuizElements(title)}
      </View>
    );
  };

  renderModal = () => {
    const { modalVisible, userSelected } = this.state;
    const { navigation } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        style={styles.modalStyle}
      >
        <View style={styles.modalContentContainer}>
          <UserModal
            setModalVisible={this.setModalVisible}
            navigation={navigation}
            onPressCloseModal={() => this.setModalVisible(false)}
            user={userSelected}
          />
        </View>
      </Modal>
    );
  };

  static contextType = StateContext;

  render() {
    // const [{ shops }] = this.context;

    return (
      <React.Fragment>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"#fff"}
          translucent
        />
        <StickyParallaxHeader
          foreground={this.renderForeground()}
          header={this.renderHeader()}
          tabs={[
            {
              title: "Explore",
              content: this.renderContent("Favorites"),
            },
            {
              title: "Favorites",
              content: this.renderContent("Favorites"),
            },
            {
              title: "Category",
              content: this.renderContent("Discover"),
            },
            {
              title: "Orders",
              content: this.renderContent("My Orders"),
            },
          ]}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.homeScreenParallaxHeader}
          scrollEvent={event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }],
            { useNativeDriver: false }
          )}
          headerSize={this.setHeaderSize}
          headerHeight={sizes.headerHeight}
          tabTextStyle={styles.tabText}
          tabTextContainerStyle={styles.tabTextContainerStyle}
          tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
          //   tabsContainerBackgroundColor={colors.primaryGreen}
          tabsWrapperStyle={styles.tabsWrapper}
        >
          {this.renderContent("Favorites")}
        </StickyParallaxHeader>
      </React.Fragment>
    );
  }
}
