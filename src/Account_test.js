import React from "react";
import ReactDOM from "react-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { elementScrollIntoViewPolyfill } from "seamless-scroll-polyfill";

if (typeof window !== "undefined" && typeof document !== "undefined") {
  elementScrollIntoViewPolyfill();
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function Account() {
  const [items] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  // can save and restore position if needed
  const [position, setPosition] = React.useState(100);

  const isItemSelected = (id: string): boolean =>
    !!selected.find((el) => el === id);

  const handleItemClick = (itemId: string) => ({
    getItemById
  }: scrollVisibilityApiType) => {
    const itemSelected = isItemSelected(itemId);

    console.log(getItemById(itemId));

    setSelected((currentSelected: string[]) =>
      itemSelected
        ? currentSelected.filter((el) => el !== itemId)
        : currentSelected.concat(itemId)
    );
  };

  const restorePosition = React.useCallback(
    ({
      scrollContainer
    }: // getItemById,
    // scrollToItem
    scrollVisibilityApiType) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft = position;
        // scrollToItem(getItemById('test15'), 'auto');
      }
    },
    [position]
  );

  const savePosition = React.useCallback(
    ({ scrollContainer }: scrollVisibilityApiType) =>
      !!scrollContainer.current &&
      setPosition(scrollContainer.current.scrollLeft),
    []
  );

  return (
    <>
      
      <div className="example" style={{ paddingTop: "100px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onInit={restorePosition}
            onScroll={savePosition}
            onWheel={onWheel}
          >
            {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
                onClick={handleItemClick(id)}
                selected={isItemSelected(id)}
              />
            ))}
          </ScrollMenu>
        </div>
       
      </div>
    </>
  );
}
export default Account;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function Arrow({
    children,
    disabled,
    onClick
  }: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          right: "1%",
          opacity: disabled ? "0" : "1",
          userSelect: "none"
        }}
      >
        {children}
      </button>
    );
  }
  
  export function LeftArrow() {
    const {
      isFirstItemVisible,
      scrollPrev,
      visibleItemsWithoutSeparators
    } = React.useContext(VisibilityContext);
  
    const [disabled, setDisabled] = React.useState(
      !visibleItemsWithoutSeparators.length && isFirstItemVisible
    );
    React.useEffect(() => {
      // NOTE: detect if whole component visible
      if (visibleItemsWithoutSeparators.length) {
        setDisabled(isFirstItemVisible);
      }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);
  
    return (
      <Arrow disabled={disabled} onClick={() => scrollPrev()}>
        Left
      </Arrow>
    );
  }
  
  export function RightArrow() {
    const {
      isLastItemVisible,
      scrollNext,
      visibleItemsWithoutSeparators
    } = React.useContext(VisibilityContext);
  
    const [disabled, setDisabled] = React.useState(
      !visibleItemsWithoutSeparators.length && isLastItemVisible
    );
    React.useEffect(() => {
      if (visibleItemsWithoutSeparators.length) {
        setDisabled(isLastItemVisible);
      }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);
  
    return (
      <Arrow disabled={disabled} onClick={() => scrollNext()}>
        Right
      </Arrow>
    );
  }


  export function Card({
    onClick,
    selected,
    title,
    itemId
  }: {
    disabled?: boolean;
    onClick: Function;
    selected: boolean;
    title: string;
    itemId: string;
  }) {
    const visibility = React.useContext(VisibilityContext);
  
    const visible = visibility.isItemVisible(itemId);
  
    return (
      <div
        onClick={() => onClick(visibility)}
        onKeyDown={(ev) => {
          if (ev.code === "Enter") {
            onClick(visibility);
          }
        }}
        role="button"
        style={{
          border: "1px solid",
          display: "inline-block",
          margin: "0 10px",
          width: "160px",
          userSelect: "none"
        }}
        tabIndex={0}
        className="card"
      >
        <div>
          <div>{title}</div>
          <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
            visible: {JSON.stringify(visible)}
          </div>
          <div>selected: {JSON.stringify(!!selected)}</div>
        </div>
        <div
          style={{
            backgroundColor: selected ? "green" : "bisque",
            height: "200px"
          }}
        />
      </div>
    );
  }
  

  const preventDefault = (ev: Event) => {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.returnValue = false;
  };
  
  const enableBodyScroll = () => {
    document && document.removeEventListener("wheel", preventDefault, false);
  };
  const disableBodyScroll = () => {
    document &&
      document.addEventListener("wheel", preventDefault, {
        passive: false
      });
  };
  
  function usePreventBodyScroll() {
    const [hidden, setHidden] = React.useState(false);
  
    React.useEffect(() => {
      hidden ? disableBodyScroll() : enableBodyScroll();
  
      return enableBodyScroll;
    }, [hidden]);
  
    const disableScroll = React.useCallback(() => setHidden(true), []);
    const enableScroll = React.useCallback(() => setHidden(false), []);
    return { disableScroll, enableScroll };
  }

