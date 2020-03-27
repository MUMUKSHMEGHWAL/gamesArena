// tslint:disable-next-line:quotemark
import styled from "styled-components";

export const StyledMain = styled.main`
  margin: auto;
  max-width: 1024px;

  .mainHeading {
    color: green;
    text-align: left;
    background: #fff;
    padding: 20px;
  }

  .container {
    padding: 20px;
  }
  .filterWrapper {
    display: flex;
  }
  .btnAndInputWrapper {
    height: 40px;
    border: 1px solid;
    border-radius: 5px;
    flex: 1;
    margin-right: 20px;
    position: relative;
    input {
      height: 100%;
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: inherit;
    }
    .crossBtn {
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 20px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid;
      border-radius: 50%;
      font-size: 16px;
      cursor: pointer;
    }
  }

  /* gameCards */
  .gameCardsWrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 20px -10px 0;
  }
  .gameCard {
    width: calc(50% - 20px);
    margin: 10px;
    padding: 10px;
    border: 1px solid #545353;
    border-radius: 10px;
    text-align: left;
    .sectionTop {
      display: flex;
      position: relative;
      .imgWrapper {
        height: 100px;
        width: 100px;
        display: flex;
        align-items: center;
        border: 1px solid;
        flex-shrink:0;
        img {
          display: block;
          max-height: 100%;
          max-width: 100%;
        }
      }
      .star {
        position: absolute;
        right: 0;
        font-size: 24px;
      }
      .textWrapper {
        margin-left: 20px;
        .heading {
          font-size: 20px;
          margin-bottom: 7px;
          padding-right:50px;
        }
        .desc {
          color: darkgrey;
          font-size: 14px;
        }
      }
    }

    .sectionBottom {
      border-top: 1px solid #545353;
      margin: 15px -10px 0;
      padding: 15px 10px 10px;
      display: flex;
      justify-content: space-between;
      .genre {
        color: darkgrey;
      }
      .score {
        color: orange;
      }
    }
  }
`;
