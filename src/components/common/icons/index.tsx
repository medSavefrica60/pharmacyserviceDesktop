import { CSSProperties, forwardRef } from "react";

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  onClick?: () => void;
};

export const HospitalSVG = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        style={props.style}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        <path
          d="M35.9972 26.162C35.9988 20.7284 31.5936 16.3244 26.1584 16.3244C25.1404 16.3244 24.1584 16.48 23.2348 16.766C23.5296 15.8185 23.6789 14.8318 23.6776 13.8396C23.6776 8.40435 19.2724 4.00035 13.8384 4.00195H4L4.002 13.8396C4.0012 19.2732 8.4052 23.6776 13.8396 23.6776C14.8576 23.6776 15.8396 23.5228 16.7636 23.236C16.4695 24.1833 16.3203 25.1696 16.3212 26.1616C16.3212 31.5968 20.7268 36.0016 26.1604 36H36L35.9972 26.162ZM13.8396 21.0116C12.8974 21.014 11.9641 20.8296 11.0936 20.469C10.2232 20.1084 9.43284 19.5788 8.7684 18.9108C8.10045 18.2462 7.57095 17.4557 7.21055 16.5851C6.85015 15.7145 6.66602 14.781 6.6688 13.8388L6.6672 6.66795H13.8392C15.7564 6.66795 17.5572 7.41435 18.9116 8.76835C19.5795 9.43279 20.1089 10.2231 20.4694 11.0935C20.8299 11.9638 21.0142 12.8971 21.0116 13.8392C21.0116 17.7932 17.7948 21.0116 13.8396 21.0116ZM26.158 33.334C22.2048 33.334 18.9888 30.1168 18.9888 26.162C18.9888 22.2072 22.2052 18.9908 26.1596 18.9908C27.1021 18.9882 28.0357 19.1725 28.9064 19.5331C29.7771 19.8937 30.5677 20.4234 31.2324 21.0916C31.9002 21.7559 32.4296 22.5461 32.79 23.4164C33.1503 24.2868 33.3344 25.22 33.3316 26.162L33.3328 33.334H26.158Z"
          fill="#090F1D"
        />
        <path
          d="M30.6652 4C27.72 4 25.3332 6.3884 25.3332 9.3348C25.3332 12.2792 27.72 14.6672 30.6652 14.6672C33.61 14.6672 36 12.2792 36 9.3348C36 6.3884 33.61 4 30.6652 4ZM30.6652 12C29.9586 11.9993 29.2811 11.7182 28.7814 11.2186C28.2818 10.7189 28.0007 10.0414 28 9.3348C28 7.8636 29.1952 6.6672 30.6652 6.6672C31.3725 6.66783 32.0507 6.94908 32.5509 7.4492C33.0511 7.94932 33.3325 8.62747 33.3332 9.3348C33.3332 10.8048 32.1368 12 30.6652 12ZM7.9988 28C5.7908 28 4 29.7924 4 32C4 34.2084 5.7908 36 7.9988 36C10.2084 36 12 34.2084 12 32C12 29.7924 10.2084 28 7.9988 28ZM7.9988 33.3336C7.73507 33.3334 7.47731 33.2551 7.25811 33.1085C7.03891 32.9618 6.8681 32.7535 6.76729 32.5098C6.66647 32.2661 6.64017 31.998 6.69172 31.7393C6.74327 31.4807 6.87035 31.2431 7.05689 31.0567C7.24342 30.8703 7.48105 30.7434 7.73972 30.692C7.99839 30.6406 8.26649 30.667 8.51013 30.768C8.75377 30.869 8.962 31.0399 9.1085 31.2592C9.25501 31.4785 9.3332 31.7363 9.3332 32C9.33288 32.3537 9.19217 32.6929 8.94196 32.9429C8.69176 33.193 8.35253 33.3335 7.9988 33.3336Z"
          fill="#626C82"
        />
      </svg>
    );
  }
);

export const PharmacySVG = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        style={props.style}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        <path
          d="M12.666 25.9463L27.3332 17.1563L33.3332 20.7251V27.9963L27.3332 31.5631L21.3332 27.9963V23.8619L18.6668 25.4591V29.5123L27.3332 34.6663L36 29.5123V19.2087L27.3332 14.0547L12.666 22.8435V25.9463Z"
          fill="#090F1D"
        />
        <path
          d="M12.666 22.844L6.6668 19.2764V12.004L12.666 8.43638L18.6668 12.004V16.14L21.3332 14.542V10.4872L12.666 5.33398L4 10.4872V20.7936L12.666 25.9468V22.844Z"
          fill="#626C82"
        />
      </svg>
    );
  }
);

// laboratory
export const LaboratorySVG = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        style={props.style}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        <path
          d="M10 4C6.6916 4 4 6.6916 4 10C4 13.3084 6.6916 16 10 16C13.3084 16 16 13.3084 16 10C16 6.6916 13.3084 4 10 4ZM10 13.3332C8.1608 13.3332 6.6668 11.8376 6.6668 10C6.6668 8.1624 8.1608 6.6668 10 6.6668C11.8392 6.6668 13.3332 8.1624 13.3332 10C13.3332 11.8376 11.8392 13.3332 10 13.3332ZM30 24C26.6916 24 24 26.6916 24 30C24 33.3084 26.6916 36 30 36C33.3084 36 36 33.3084 36 30C36 26.6916 33.3084 24 30 24ZM30 33.3332C28.1608 33.3332 26.6668 31.8392 26.6668 30C26.6668 28.1608 28.1608 26.6668 30 26.6668C31.8392 26.6668 33.3332 28.1608 33.3332 30C33.3332 31.8392 31.8392 33.3332 30 33.3332Z"
          fill="#626C82"
        />
        <path
          d="M27.3332 4C22.5548 4 18.6668 7.888 18.6668 12.6668V18.6668H12.6668C7.8884 18.6668 4 22.5548 4 27.3332C4 32.112 7.8884 36 12.6668 36C17.4452 36 21.3332 32.112 21.3332 27.3336V21.3336H27.3332C32.1116 21.3336 36 17.4456 36 12.6668C36 7.888 32.1116 4 27.3332 4ZM18.6668 27.3332C18.6668 30.6416 15.9752 33.3332 12.6668 33.3332C9.3584 33.3332 6.6668 30.6416 6.6668 27.3332C6.6668 24.0248 9.3584 21.3332 12.6668 21.3332H18.6668V27.3332ZM27.3332 18.6668H21.3332V12.6668C21.3332 9.3584 24.0248 6.6668 27.3332 6.6668C30.6416 6.6668 33.3332 9.3584 33.3332 12.6668C33.3332 15.9752 30.6416 18.6668 27.3332 18.6668Z"
          fill="#090F1D"
        />
      </svg>
    );
  }
);

// uploader icon
export const UploaderSVG = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="70"
        height="52"
        viewBox="0 0 70 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={props.className}
        style={props.style}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        <rect width="70" height="52" fill="url(#pattern0_230_1884)" />
        <defs>
          <pattern
            id="pattern0_230_1884"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_230_1884"
              transform="matrix(0.00323625 0 0 0.00429958 0 -0.228571)"
            />
          </pattern>
          <image
            id="image0_230_1884"
            width="309"
            height="309"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATUAAAE1CAYAAACGH3cEAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC+DSURBVHgB7Z1/iFzXlefPua9kd5we0mEzuBkG3IMb4j8WVCEBG2xw+y8LNsEKMU6UCVhmNnK8imP3Mmx2YYIVZpdZDTu0Za1wJDN0iyGRbWIs4Q3If6UFbVBgl7RgFmRokzIsbPufnQ4oTlvqd8+ec9+rVnX1q+rq7qpX71Z/P9CqH6/UP6re+95zvveec4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYE/8/bm3J3t93dzc/ASBaGAC4IBx5me/OELMjzDJWvrpZwuzs8+tFb1u7o1LM87TjL3u//3fz3526tRz6wQqjyMADhjsOERpQjyR3Hfv8aJIrClozdfd96efR7QWCRA1cOBIDiVXneMQdRUJW6ugGXp/8T+cfGaVQBQg/QQHknPzb0/6DX/cexmzx81UlMbH6u2C9uILxxYJRANEDRxY2oXNEa97yu6HxxC0KIGogQNNu7A1gaDFCzw1cKA5+dwzqz71y63Pqc+2vrG+vkwgSiBq4EBjkwK2vKP1OfXXxjrNioLqA1HrwqlT82OdTuxeF2+C6rJtlpNkudusKIgDiFoXvvBnY99x9429PHfh5/XW5+fOv3X03lr6g/929hcPEYiSomUbLz7/3cuu5hYgbHEDUetKEnwVJ+5oU9hM0Bz5OjtZS8Y/w9qlCCkUtHxSwDy2ImGzqJ1AFEDUujB74pllz8llu58J26XjTUFLa58tzD5XXF4Dqk0tpc0Iu2iWs0jYvvAAQdQiAaK2A1uFjaYgaCMAy6JjWmXHVzst22gKGzM1nKNFfN7xgHVqPdBMOZuPPfvLsyf+ElP+AFQQRGo70OqheR2x7blWjw0AUC0gal2wFjVbPLTvH1vc4rG9fmmKAACVAqLWBU7cmnkqrR5a02MzT4bG1uGzAAAAAAAAAAAAAAAAAIgarFMbMcKMrJM6MWf1iik19N/G7AvHGgTAAQCiNgKokM24RI4yuaeYeEqfuqWztrfsmAg1u4ksS+rPpESLEDgwykDUImRufn6C7owdPUT8uCenYiYT+kEue6EPnJclIdlSaM+Opz1xnR19SzytU5qe+dG/++6rdICYO/fzOtV4KkSwImvkeW0WnW1HEohaJJiQJbc/d1wjsKeEXF2FrMZCS8T+BqVsQnarl+8jiTui3+NZ8nR9455PnxvlmkaLYA8l/GxT+CmPYDV6Hdf749mrZNGTv+FTvkxj68uo8YwfiFqFseiiVqs9RSwz+lHpl16URFc10vhAvOy59pQTnhTmORJa3Tj06ROjdiGbr1hLeN7eM4tgVcDf0fdsuVX4NU0fJ0fTeuewPqoL6f1M6JY9pdc06l3UaG4ZqXp8QNQqRrs/ZhelRhY3NNJY3o+QtdMUNha++sMTzzxHI4K9f0mSvOtIGinJaZdKzz3vNE2va5o+7VToVOSstndc3/tG/t5fSb1fnj2JRgZVB6I2ZII/dvvemUPsnirwx672mlbuBe/sAuY3KPVPjMLOSWfP/+KoqvW7JP6iRmcLtE+CF8mZyGlUO23RnBCvsfhFvX8t1UEGvlz1gKgNgX75Y/2Ak+RZ/Xn1F098+ysUMZZyaoT2W5b0Sj8ErQiLbjUlnda0VVNWaqasBF+uWkDUSqKbP6YX4UqZQtaKeUuS8HuxR2uvXXjrd/rH3OQNf5pKAr5cNYGoDZCy/LEmQaAsinB6YXm65T195KgHTylxc3YRvnTiuy9ThLx24dJxfY/nPcmx3XhogwC+3PCBqPWRHfyxbevH+gIn95Pzj+kd/dKLiGVdhNeZZYyEx/SCuqoX08Wu4pYk39IU6nuagn6RIuTshTd/rZMe62VGab0CX658IGr7ZCj+WMKHNSp7TJgeI6sYYFkVkQ8tItCjjZZXTjl25v9Me5FZFdaVom8Xcwo6N//uRO3O7X9RL21WNNXb8T/oe6f/TnMWQa30HM32CfhygweitgfCOijnni3LH8tEhx4MQkZ0RL+/+TYN/fpQyN/UiKzrBaCCO6Pp2Vd9Kt/veAFbCir+ykvPHztFEXH2/Fs640n/pIL8ja4vdPykvhE/tPdO3w8dBEijWZrU2zFbr6fHVixF1M90mTboIyoJ+HL9B6LWI0PxxxJ6koKQybRegDWxi0942bP/UKPB9V19P+Zn9Xuu6cU/W3g80lnQMxfefDUhflw6/F2G6N/G7L+j0exvPNH11vdO35dJFZJJR/yACpqJ3KR+tjooZSIntng3lRtUIvDl9gdErQPBH1sfq7eW2QzHHzPx1NTStnTbpZC1MWXC5lL6RlEkGRbjEl/aSP1fxBQVmJ+mn0tDUrlY+AKL0By9rO/jRX0fd/zM9H0es60QVe0e0IfWDEAHsHCZLOu/K/o9ltnTjVKX3bT4ckHkVHjhy3WmRmCTLf7YHfXHErH3Z9lRer7pj9npLdRH1OOxE1UF54imr+FkJfVW7CIkueuP8f5/aEP/rnWdHX1UU+T32w+qKKxyjVcTJ0f1YUTF7pr+q5/WZXw+ru/ltV4ELXw3HTj0rdaUXm7aYxM51s9FP58H9PmvsaOv66SEbWysApdFc+rL3RikL6fRmf0ctTXU4qBsAFJhVV/OvFU6qY+nz154i+DLZRz4SC02f2xfP5v5SU2zNjRV+0nh8cSdVFH90osnnnmCIsAsgVrifs2pFEafetE/qqL0NypofZ0VtZSVQgRHD4jdF5momC/X3L7xQPpyB1LUCvwxHXXpg4H6YzWNkISP9MMf2weWgn5LU9BjRSIg6uXo8bmNQ59+MYZR/sz5S6cSdk9JR5/QndRZ36/p33qRBgh8uWpxINLPpj+WCVnt2RZ/7Ffc4o/1Na1s8ceyk0r9MTuhRN5Rszr3x6QfaWXvv5L5cvoGeOenuWD5A5ugJ3wruTNmKegCVRzH/LjerHQ6LmHJBN/s8ye7/edkqe2qtyhNWn05spR1Ro8dV4G1l5bmy9ngnAvqL+2x+XIaVeqAyof1jfu7mrjJ1y68PZK+3MiKWpE/FtrQjIY/tickiwhXHSePaqpbOErr+7UkKUchaiprGo3IPxSlGyE6tvVorINWye939L6cyDX9fRZj9eVGKv0MRc2Oj5qQjbo/tlf0wnpEf99HO63rylPQVzQF/Ysqn9BzF96u10h+29FPSxIdYPyrGhX9lCoIfLnBEX2kts0fs4WVOrunJ8asheD9HqRb/TGf+2M+Sz8+sPTjrj9W1fEivCdP2uYsRSmoM/FPqFbTdF0fLlJFScTPaJTRcaBi8nWRLdUVlaKZsupncd1C6ODLsflypL4cPa0R3A85Kc+XC++jt0zGvjIPsunLJZx8Vb25v6KExl87/1ZDBXdRf5drVfXlohO16vpjcYS9+Ur6hpVP2d+w7XgQCV7xSVjasUhVhWlGP4uVTu+5WLTBei4MKdXfLTH5cuplHlYzp7K+XBTpZ2F9ZTCI/fuDrK8M/hiRiZkVImsqJjdtISxRdSOAXggpqKhh7P2xwhdEUOAeWg0RvcWpv1r4gsS9p+fFL/Xz+phGgMyXo+DLUZjFpklrWEDmk2W+3FIV6lhzH/lymspPh5WqVlbU4I8NEGaLbl+SlI4VXQRVL3DP9iBwv1Pz/ftSVKSf+2ney2lbcEwjSiV9Oea6ityTeg1Zed/CMMStUulnWEzp3OOaNhwv0x/TkU6jMdsAODZ/bI/YFnHs1jSF1wkDemfb4SwFXfYupD2LVDGSRH8vOzdS6bScwwzv1VEWNGM3vpy+eoksuxm0Lyf6c1JaClEc85wGJjN6XT9RprANVdQ6+WP6YZTqj5l5rmL2jkTmj+0PW24QxPydoqMq+Mvqu2mUTKeoYuj1O+PMV+pwXCM4m+RYjcRO6xvtvly+x+mk+XL66OtkUV1JvpyEZp1yzNXcj3X66ddlCttQrl0Ts9rt+17SkPll+GNDI9oC97MX3v6tni8aERQLsvlpqfhfsa0VA5sMy5djFTb9vg+l93z6lTKWCZUeqYUtzO64ec27x8jLz3nLjkn9GVs7+WMS/LH0VyPlj+2dKAvcrSkk3bld14vzXNHZohMg0z70TLOZTzShaSXPQho6mDf09lq2KFlscFOhkymxCSSWCRW4/vpyG3JOz6U33O2xl6mEyL9UUTt7/q1XVHFOaUj8jo6y/72fK/o3/THP1rLnsQPjj+0Da2sUqh9I3i9+gXojXLMUtDKiVrt92/y0W9Khi68NZnp8TWflMHD1RhC5QfpyFrSoN35a7YxXNEt7ddDRWmmi9tr5N182QbM/Tj2Pq9QPCvwxHWluHjx/bG+E9JvpWy6UFG1PQfV9/ECjuTmzC6pSXeBZZhLizn6arU+T8pY1jBq79uVM6HoQubyuuFFGtFaKqNkUvM62vaI5zUUVmv0J2l1/zESsnq2LCf5YJeorYyLGAne9nA4Tde6kojPn6pnK/ybQH3SmPHjQHepY9amn1cNcUrvi3E5eXFmTT45KoObcnKrM9b1sMhvWvthGI4k7mS2oDKnQjJ64v/eUnhHx+hXSpwaBXWHVBdYCyQrcO73G1gYyJc9SZbCmkL4wMtBzZTIsADVPCAyEFl/OGm9e1Pf7jJ5Jf+4cz3kK6+Y6s+E/0H/rYdXDABm4qNnEgJ5tR0Mk1SNByGr8pDj3Y0n4kj7xXzUctr5Y5o+dDm+mFdjC8N8/wrb+70inw5aCWkQ86BOxF8K5RFa+U7xrlE56PKg360xIP0vDIjm7tlnWXMI/7vpazQzC7frYQM+lgaefztFxHe2XetpkNmxfxsfhj5UIe50R5qMxFLjruTQT1jF2OK4pkdoRYWYPlIy+71fUynhJOpxH+WtswkFPJpqiAWZWA4/UmN3jXmcgd3xhqDdkTS1lzIu/aCUuKmhXyJYeyGivDB8meY+1Rr4/6Pbj2QRCs8B9qPTUFFK4QaB0citDxSx5kobMQEXN1hSxbagrHctZ8t+C9Y2QHwr5Kypk1qmuQaBMPlQxONL5MC+5Svhq1hSSOvlpthZxOqxPA8NBvUy+24dtG7aG0G43ausDbVc02EhtfT38gZ3WFN2Fj1vHzUzpQdlYl1adNZzsZPRy6m0iZuJs7mkNA2sKqb/phNoYxalN4h4UiytHpCtHrEiXladhQbxQY9DLg0qZ/ez+G9iEgKWcco3AcLACd2I1eqlwFjRPQZsF7kMhNIVk6toUknpqCslfDruyg/6jA6NaBB0jZVtDqNf5wDegGfREQcP+4Q6LO8Mx5mksluwNuxh16vxh28xWH05Q1ue+L2jaMBYi5ho/XfzDadxWhL924c0hpaFuIrTWqblLRUf1vRm3NXf6N7zU7bvY36kTI6tqdfQ8Gw96Q8Lmz7LY8TjTtE6n/xcaMIMVtbGxNbpzmzot7jRsXZHejISotYjOVN7raix7Xlb18ar36TUVoj2F3tbYMRjlQmuaKurkCd8cSFfXHb4nD23+WbbcdGLH3475IfXdHlKRfFLEv08DIBSMS6inVAENa7oOREps/nm2hpALjmVrCBPvB24xDVTUZp/75trZC28vdmodbdiqdp9FHlGzKTomZLztmP19k84l5jEu71rcmGb0ez9sKbq+j9dDu+dY+lRXDEc8oW/oFNtqeOZ16bftwbZXBtWzcyAfApivD0pAK8RU+Ne7laKRJ19DuHayhD0NBu6peUmvWb/4Tsezlif5GxIrbOunbAa3J6+mzk5nEi2V6ulbu8OO3OPi/Vt6AV4n0A+sh56ed2w+XZ36BYc+b/XtT9Mj+jk+P8penkWnLqwh7Ggz1XXCsBTffOCi5nxYsFnPp9y30ZxZk51KLKpKOJHd47v7LzTBnHy7p5OcJYvusMylzzizPFb0s3uqX+dewu7hTsesd5lmLD0PZrEhITDhrmsIif0ilcDARc163Kt6f6zTuYWL8rJNha3Qlb5MsSE8sVtBa2IneWL+2w7f39qapyK/ITAA+P/oANNImPshNlM7DVL2me8mSo8JvX4nd1xD6LiUJVulLOlQlb6ctY4uxkTNzHWKDJ0U2JOg3YUf6XohcHbyo5ZxcGiUZs0y1/YrNo57i/ZClD5iwhYmAWySrMsaQrt98fvlbOJTiqjpH6uipkrdIQX1NmPCO490VUIvBPtd9+vHjGmUsFOEiqL9AeMzX7fWsyVQzAO9vnDkhI3DbH/3jaWJSluHWoqoZdus8UZoHV0Ah01T+RZ3qD+sItKnGVvrMkpgqLA1nM4skAmNvp+iPaAX9dSuXj9awma91br4adZoIC2tWqi8igJJr3SbBc36dtn6oThQL+0L1B9G0jiOjUzYaNkRa9ThdlWU3Uy/aJeYsDmXPB/tJNkmtucodasUsF3dL1NJlCZqGpEsasrW0VcLfbs0akEJCxgevC7M/2xr2Jh345fy/bR3zIJ4Nt/hKT7E1v3JRMemFUli2df4oIvYWylN1NJDY5ezFFQKo7U8Bd1wO3tMlcCT/z31B3hmVUJsk5HdrWHLKhT2xRhbiVo/18yVRBBj5tUuTSusYmi5zD0uShM1qy4gC++7tY5mWtKIbooigPu1A3iXEhruX4oLdoWzFjoNZ6VUPaSGQq4v6aOtmdN/H6aIsOvVSWc/zTaW9pSW2qyi1C4dIv6KppddlnZYtEZR+GrWFM/LPmtWmdZ8t84SrNECGAphqQfR6o5r2MJawv6Z/TpZcWR3qe9w0bRzUrpuhEN1J+V2TC5V1NJ77l0IvlmHFFQ2QofcsXj8BdlfPZ/wcsdoL5Rejebq81joZQ2bc7QfP60QS31jEDZb1mSz99xhkiBvCjle8+Usum1SqqhlKSgvdmsdbQtxJZpoTVb3vP4mRGkdwvIw+ifRLG8ZZXZew8ZTNABiEDb9HS346LqxtDWFfOGFYw0qkdKbRO5U4G6to2NJQQ1NqRd3LWyZoHXs52WVCojSqoEt9dCbf7Y1bIkrWOoxwEqYqgub1Xu6LvWeZTWFbKd0Ueu1wD2mKW4TtpCK9tBOSE+E66n48x239wtT5PHNgo02vC7ZjuQPta5hC1UlA148bcKWbwBcOfKmkN38tGm9OEpbn9akdFHrtcCdImtHpCPSddsFK2wVZjtgbfHKeC3rg6bHxb/fbXcs9WiGvhsPKGL7GjYprw9g3YStams47zaFLDoWZo1LaQrZzsD3/SzCCtz1j9YTQ94pOh58NZEZKrFerC/Yxq46oqc2ehX0cNypraP1TqOIUu8DR8saNmH5vSPX90mCLpiwTdrA2ZelRPtnKvxbgaaQ7Qxl45VRLHDvC1jCEQFb1rCVOgBVqSdblZpCtjMUUeupwJ15NaYC9/1iURomB+KguYZtGJ9XVXqyVakpZDvD2yJvpwJ3oaWYCtz3hU0OIEqLinwN21D63FWhw0eVmkK2M8R9P91lFLhnYAlHnNgaNr25RUOgKWzDuD6q1hSynaGJ2sY99yyOUoH7nsESjmhprmFjGo5xH1oXDcOiqVhTyHaGJmqjVuC+V/bfEhwMl2wNG2UCV/5PZxlGL7ZKNYVsZ4jpZ17gTnSk0/GYCtz3yBQhShsBeF3VZSjCJkOJEndsClkvsylkO0MVtVDgTjTevcCdN6JtoLcDzEklV4qDPZCvYaOyKXv397wpZMfOHFlTSCqzKWQ7QxW13grcaSWWAvfdgCUco0i2ho1KIzR/uEkl0mwKqZMEnWZ+S28K2c5QKgpasQL3rLZNOhR4W4G7fE8/vP21+akQNnOk090zO9cY9OOHcVR1tJ0QST/upbZ22NhSDwrXlfw5DQirKPBCv9H3ZJFKxjzuREKgUYg1hUw5HdokgTF8UePksiN5xda2FM2mWIG7JPRDuzCl7FA7J0xf28bDWUcG9U/o+n5+F3b0SGlRGouJ2tFhzdD1Awntrt1lT1J5UctZUeGp9bM21NbEqZB9yOIbqZQZDW4lNIVk+mWn43lTyH+gITJ0UZs98czyaxfe/JiswD2lbbWgWQrqrBxjSh8ORdTyljN1m0PPsXS4oY8Xdy1utqv7ENrJaARxnSJFB4BHSohp+0rWh01sEer4Xv5/qO8UWtXz/kP9bjdTn0Wpw3wfQlNIokkVrRtFv4c1hZQhNIVsZ+iiZlS8wH2KCmYo830ej9MuxQ1LOIZM1vLJsoKafoYDm61sWcNma7Z6WiCbC9lNEf/hhnV62ezmwlQFrCmkVLApZDuVELVQ4J7wS51S0LzA/bh4a/VdbhqVzVBKl+M8Rb2KWyiHGtISjog3zdWUpm/nqbD/UD/TGfY64y6Dn63UlLmh50jHia5OaSVXMDRtNoWUDtfDsJpCtlMJUbMC97MX3l4TJ4/qWbBtQsCqC6imM0vMOkvqf0MlsZsZyl7ETdPOb9OwiHD7tUFgG+YI+Yu5BTDw94QLoiybIa1SWtkreVPIxS7HbaD4TzRkKiFqgVDg7urcYTOTvMD9a/rGlSZqWZH57k63InHLJhqcXUTDWP3d0Ej3pwTuIrKmEdQVvXeFSkJn+F+x0iFP/nrV0speCF1+N5tCFgk12wTC5DCaQrZTHVHLCtz/Se+cLjqaF7g/XVYKut91ZE1x09uYzl0wQHSW/3cicc5C20yuncrSYRJgmE0h2xnq4ttWeixwv1VagTtaAQGwSbMpZJfjQ2sK2U5lRK1SBe7YcxOALVS5KWQ7lRE1oxIF7thzE4BtVLkpZDuVErUqFLijYSMAW6l6U8h2KiVqQy9wR8NGALZT8aaQ7VRK1Iwed3AfiPBgtT8AhVS6KWQ71RM1Tqy53E47uI/1PQVFlAZAB6rdFLKdyomaFbgPYwd37IwOwHayndar3RSyncqJmmEF7vp2dtxpKoia9FXUpqjkjWm7kZXRkKbhvjI+BTio8P1VbwrZToUqCu6yU4E7bfgP9DfvW4H7TkXrZdCsB0xt2crdVedq0NL+lpegSSTYBzE0hWynkqK2U4G7sKww96fAfVhtte+2maFGap0jciHre0UVmkSCfRBDU8h2KilqgbIK3LmkttrUbMNskZhGZCW3mUGTSLBbYmkK2U51Rc3TAif0nqag54p7rO2/wL2MKM3SSk/0cWu/LFygIAZiaQrZTmVFbWNsbLl2586Gd+k0F4wEocda4m45pi+r6O26Md0gNz8p8seGLmRoEgl2SSxNIdup7Mli1QXqq4UCd50FLAxvrcDdhx5PtOs3tp+bn5Tmj+0HNIkEuySWppDtVHoEtAJ3VYy/1bvnCo97WVJB+RvZbbO/MCNopVh7j5+G6Y/tEjSJBLsmpqaQ7VRa1KzAvXbn9pwVuBenoGpgJlbgTrvaPi9sd7eHKA3+GDgoxNQUsp1KLr5tMsAC95529zGyHbfl/ZT86VT8RY0eF32pu3ADUD4xNYVsp9KiZgyiwN3KsDp+N00r2T5MoctNIdM0s6WvPACjT0xNIdup/KyS97TgEnrFaw7vaHupxl52cNfXLat6Tah4ha4crf7YBtHqptGP3BIcUEJTSJ2AK5rsyip9qtMUsp3KR2qzLxyz5REfq7AVtvnea4G7pZEWialzdyb1/rQK3ft+ywayABxMYmsK2U7lRc0YVIG7CZgX1BMCsIXImkK2E4WohQL3Lj3WQoG7bcjCaMMNQB+IqilkO1GImhW46/iwptPIxSloKHDnVY2Ly9k+b9BYETq5h/UOOvGCIRBXU8h24ik/qeIO7n0kbw80ZaOgVTqwIxXpMPuE6BOUxt2mkLRcWBETmkJKpZpCthOPqJVQ4F4mwYh1fL+tsdNw2TyKMafeoM44/dx5WhLyq5ydQP+aACgNawpJq27DR9MUsp1oRG3QBe5lEISMnf1+9cTRpEZlG4l6Fypk/+i8XFUhs8XE/a1SQJPIyqCf8xH9Gxr6Gd/0Xj6p4uAbY1PIdqIRtUEXuA8M88fU61Mhe8g5nVUiuqUR2VW9Sj9QIV7JqyIGV26VN4k0T5KiRcbVY/wf0TeJdLysgqGDGT2t58K4fuirKiKr1gyBxH9SBdGOsSlkO1G1dOm1wF1HxPeHOQoW+WNOeEn/gDPi/fKQ1vRW1gPZCRX9kWgS6Xz6frOWUq2Huiee1kj9sArF14WdzeyvaTS/apGchIkvFboSibUpZDtRiVqvBe46Ct6/mwL3/VLkj+Vr5zb9MRQngFZ0AFYjXmyAC1GRnj/TnlXknIqckPqoclQHx3UdoDVd5YYqyuqgz+lYm0K2E5Wo5SloKHAv2rIrry5Y8VmB+0BPgBZ/7CE9EadK8cf2g1hvrDg5CE0iTUhU5MzLumqPXaKzkD4XuWygPKIiZ+ddw4z8QfhyGjk+lIQGEXE1hWwnupMlpKCOT+q9i8WvsAJ3+bf6sbxP/aazP3a+FH9sD+iJuB78NI5X1PT3v6WDxGd0gJCwJZ1+pbRkj50tPHc68xh2F7PFr1t8uQaZ2O3HlwsTSmIp8elOzU2r2hSynehELfVyucY8188C9240/TH9RB+yRYkV8cd6RoVW05b0DIGoCcuYfPBFl5sDer98uSzroG9blqMX2NWi11S5KWQ70YmaFbi/duHNrMA9pXfaj2fRklvWmTJrR7RrUevoj2nkx2lIK+GPgUrQD1/OBu2whWLWqeYnnUqMqtwUsp0ovQorcOdQQiTvFB4Xuagf0px+Ysu9RGu9+GP5zwWgsuzGl2MKi9Qn7FxnER2wacF1KGA3rCmkr2hTyHaiFLWddnAPC3Gduygsx/XVVws3PC7yx7K0srL+GAC7oZMvZymrY/m8HvtExWzJzvWdzvO8KeQ5ioAoRW2nHdwD3i+osN1SwfqWCNs6Jxud1kI6GdoUxeePAbAfmr5cnrJuPrsTVW8K2U60U+We/MWE+THpUOBusPe/1LB5yRbBajr5qH4wE+oZ3PJE72i0h/VjAPRA1hRSKtsUsp1oRc1SUEn4rzqloE0sBNeR6WrTZzARQ1oJQO9YU0hNWaPw04wo+qkVYQXu+nZveOenCQAwMEJTSKnmJitFRCtq2fZ5FArcCQAwSOrqTS9SJEQraoZVF9g0NQEABkPo6UeVbgrZTtSiZgXuejNuBe4EABgElW8K2U7UhcI7FbgDCjV9mjocpshJhT7kgrI4MFhiaArZTvTdD3YucD/ghB223EzsTSITkjVPBFErmRiaQrYTvajtVOAONkGTSLArYmkK2U7Unpqx0w7uAIC9EUtTyHZGovneTgXugNAkEuwaawpJzIsUGSNxsuxU4H6QQZNIsFdCZ480rXxTyHZGQtR6KnA/oKBJJNgLMTWFbCd6T62JFbgz82MEANg3MTWFbGdkRC0UuGu4bCkoAQD2hTWFlEiaQrYzMqKGAncA+kfeFHKRImRkRA0F7gD0hzzbiaYpZDsjI2qGUHox9gL3cEI5flSc+7H+Rf+ZACiZrCkkRdMUsp2RErX00NhlirDAPQhZwt+ixM1JwpeI3V8z0See5B8JgJJhksc0OIjSTzNGStSyFJRDgTtVnRo9qAL2bC5k7+lH8T0dI6+pj/GNF08888UXn//2cW/r78DI4DnRgYsPV30yS4QeI0mjPfdGbqV2KHAn/nElC9yzE/oxYTtpwmLYa3p7hZyfjTXUB7viT/TcfFUSu8srGo3bFo7L3tNHlalbDv3TZPJQyhC1qhAK3BOe846nnZcVGiKhwiHRiEz4CJuQaWrsTci8nP6Te/648FxEParA/mH2L9vgdfaNSzPiuS7sZpj5r10iEyS8qoPdCosskdPzdoM+omEg8h/1d1qIrd6zlZETNStwtx5rCYvtHlW6qOVC9iRZRBYa7PGGehRXhPyLf3Jo/TKEDORRuX29ao/PXXjbepbVWYLIfUcHwSlKyPbiDNvZkZ3HqdygASNJ8qwTWU/S9KcUMaNZKKwfis7gvKdR0fulhPWc3C/OH7EC4LC+J/Qu8xeJZXa8tr4MIQPdOHniGRMu+1qwx6+/fmlq45Crs5cZIZ7RNPWHal3YIRU5so22lzilj/pZ52yCpgJ6XCj95gsvfLdBETOSopbXgv5Pl9Df6oc/O5Ai9y3+mKg/xvDHQF/IUz/7Cr7W/Pz8xK2Nsbp6bxrJaTTXR1/OMguvE1YqaE+7lJ87+cJ3o5+cGtmWLhuHDn3z0J3bv1Vv7aSOeKdpn3Tzxw6pjxezBwGqTR7pL+Zfgf36cuF8drbBNx93QuuaaTxx8oXRGIxHVtRseYeG8U9Q4n6tqegbPpWf7HYkgz8GqspufDk971dU7MK5zzrr7omtlNBskg3NMs58/p5PXx2lc3mkm+9Z9GTCtpEk85qKXtIPeEHSHXw29cc0hXwsFzL4YyAKuvly3po9Cn1FnbMJIae+nP9fej7/ZFTP55HvKJqnhU+8duHScUfuFY28jqtQhVml5uilH/h43j8q+GMakt/QEe0y/DEQK+2+3EGisqJ26tT82Pi/uncq2fhsdXa2+2jy9+fenjx0+w/r3V73oxPHFvRmwbwI9R6Oto5eIRqTYLjCHwMgcioral/8s88d1ajpIb7n3rW5ufmFToI1d/6to47US6jdu6ZC+LNTp55b7/Z9W7wIAMAIUtnaTxciKMsMeSK5797jKmwT7a/JBM3Xm68jAMCBp7KitnFo7E122Qa8RcLWKmhGjf3lnaI0AMDoU1lRsyUZae3ehSJhKxK0kyfi66UOAOg/lW49VCRstfs+9wMIGgCgE5Xvp9YubJ5krHkMggYAaCeKJpEmbCK0ZcGsRm3rt/9wu0EAANBCFKJmHpot72h9jjVi6zQrCgA4uFRe1NonBTQNvdptVhQAcLCptKgVzXL+6Pvfud5pVpQAAAeeylYUnPnZL45Qh1lO89jm5t9dSDY+Oy7einQzYaO8YwEAYPfMzb07QWPrR4Vl9d//4LtXd3qd3f/9J+tvVm19aGUjNWa36aEVzXIWLfewelECAOyN+27POEdTCfMjZ8//4mjRS0zQkvs+O26vs68v/Ok9D1HFqGykxuSvOnb1dfHLL534y5tFr9mM2O7oqMF8ExUF8cFMOhC55ylidGb+umYVv6HIqVF6MzR6IFs6xXUVNnrx+budcJuCJnkJIztZUyFsUMVgApVl7vVLM7XEvevFn6ERRtMFHe3dvRQpntOPSbhrJxkdoF8h9k9UvZXV3IW3607SzSjNkSybsBUJWlr7bGG2gv3YRr6fGqg+nuhm+DdWZHRig9kTzyyrsFFT2CxiO3PhzTGWzyZjEDRjpHZoBwDsHxM2z8nd5pIiD8UiaAZEDQCwDRM2TnnLDKhV8VRd0AyIGgBgG2HZRkKPtD5nVTy12/fOUMWBqAEAttA+KeAcb64qyGdFj1KFgagBADYpmuXcqP3xZ60eW9WFDbOfEcPkHmYWLDjeI977G8RcaX+oTHZYtrFtVrR9HVtVgKhFii1azdZ3YanhXmHmT4QIopbjPvfHR5p7fRTNchYt95g79/PG7Mlq9TSEqEWKCK2ntskyAH2CE7cmXrou22gVNvPafAUrCiBqFWDu9UtT+d0pPVsmNISYSIQnNA2oExgdvFS6k4x1wDk1Px+irlPPdS45DMI2/27jX2htvdvrhgVylwERhMr7CarxlImUk1Ao/IAd05Rnyr404J9g2nai39LU8pa+6JZkj7806mVSB4FQJpWjsdCafu4NvWebaK959qHMyjM1NARfIx98vsYsNtXeExC1PbApWIdcPURU7KecuAdUvKbMZGXiqZaXN0VqNXzZfRL7+iQcFV5VcyK0Ktf/u6VlOSXJYX32FEQtfkzUdJA67UQ/Y+Fxcn5cL7/79UtvaVK/7HZc7t4PtAqgJ53YMPEjWYbwdQbpZweCcDmpJ+SmmqIlTPXN6CpxZtabCKlgJSsmVmpHfOBYMgHLhEqjLWlGXB0QAgcD9aFWxfNy+MxTe0ao0+evA+MkOZpkoXGN4CYd8/0JJV/VA+MJ0/N6Lpr40dkLb9nNclP0WFwj9WIp5IEVvAMvanPz8xO0PlZPHNcd02EdGev6NZWnhXmUFURrlcm/pb6IPpYVi6raT0cLe7PnIFRgf4SoPQyMejZK8RnFjqf1ZlxnIadbRO/fcBKep9cuvK1Rnl+2FFf//7UgdmPry1Uvc9ovB07UdAq6ntSSGRMwTzTDd3iKkiBIK/rhq1hptCXyTifhirqbBBgpdKZyxW51AF7eNsCq4OnzueDRYT2/Twaxu3OfRXcqdNIIQreRLlZtScZ+GXlPLURid8aOHiJ+3JM7ahFYSBs9Las8feSCP0GrEnyuigFPbWQwT40lnc3Sz+GhYlcPQufoQR3Ep1XYpoNvJ35RRfKKZsWLsaetIxupZQ0W+RW6wzMUfC9acpyep5SXmgJ2N12sNJVeBgDiQoVrOUR2ecKh0dske5qmhB9V5f27mtDk2QtvLkoqF3/0wrEFipCRi9SsJk04mdM/7Ev6dVXD7A8kM06jQ83icUn4PRXhBRH5mECsTGmk9iyn8o1KZgQtWCSn4vakCB3Rr4bO8v80NnEbqYL2s+ffekWHnnfVWL2mJ9AxSf25WAXNyC8AHVkZi3AjRgXNPK2lqguaYdeLbPjTGs0d09/5GiduPlxXETEykdpZ28Wd6V0v8n2XG6ijgOjIycxzOl1/RVVupAzdg4B+do/ooPSkV5Fwads6xAjwLsyszlHqv/HiC9XeX6HJyERqOgpOqaitjJKgGWyRptBFR+4p/bgeJhAFmrqNqaA9boKm4c/FGAXNyK+nFe9ohiJhZCYKDnm5vGGrthM272K0Cr29X5DEreqM1bMiTkd+9TqsxAZUFavftf0wN9SQP612yFWKEPN0vV1PxFP3eFqgSBipiYJz596uyyF510ZJvegXdFbngxh8jF6xmSpr96Lh9aPUUkoDKobQalgu5OVqjOdfNkFFGmHy0yoQ67zB3zx58plorI+Rm/18/fVLUxvOHWfWqEZnQFXgltT0XCIvHxAAoJBcyB7U28f0ujmiz2xoDn1m/J5PX30usgqEkV58+9qFS8eJEltw+1T+lNXILZFVD6RygwA4yCR8WP+dVhl4LL/d0MjyBkv66vg9ny3GJmZNDkyXjrNvXJrRcPqoEM/oH304f3rZyqNE1Ix3auRu0EcEwChSowf1cp9m4VBFQNmXdQW5oYP+IrFcHq+tL8cqZK0cyNZD8/PzE7c2xure0wxzoh6VHM76mwWs/nNVn1Ox04hOxU49hU9GyZsDo0lIIWtyfyZeNOmFJ9lRXT2+0NFDz+GPdT5TZ9P9IjtZHhURawf91HKaQife1oVZE0e9JQvPN5s4mqiZ4N0KgsfN/mgqdojwQAkE0WL3eWI/TY7GN4WLNepinTjaIl7cCOVQQo1RFrAiIGo7YGL36Z3PT3knUz71GtVZf7UQ1U20pLGGiV7WQ03FzrGsbgqf4Z3eTz8hAIrg5H5K0nHyoY/apmCZWLE1jmwRLaMZdbHImlhTBpa1hJLl+w79oXFQxKsTELV90ozwiN2EpJJ1vtWUNo/wrAvuA7S1ZfctyjvhSlZof8sE0A5sEUGLANPkFoQwQkygDOcn9fMcN5GyW7beZ3eFapys0aNkHW9b/rOKlP99iLSs9lLFSvJbEy2XpmsvoNttVyBqJRGWmtQy305P0in7cswTFNqBN/08mWJyXyAq2KCDc7GTZuvvpiA224Pnomj4XDjD/8vFMdz1f4A3WEBThAyLloQzkeG7kRFvRkmswpSJEHPeeptzUWqJpFq+eVOk1jKhkjUTKK+3+v81NXRrznMDYtU/IGoVxSLA9fWxiaYQhkjQ+wkTQ3t4VxBtn8ZNEdy8n0WIO3JX/IxmlNiCFDyX/fzdlf1sCm4XuFAUOr56U1y2HeFt3+eu8Gz+Qjv/rCzF2/yujfx3bOS/bCZMJlacVXeYSDlJ1kygxsbW1w56GjgsIGoHgNfvbsFHmyKZ0xTJ7EHYlm9LlNgUz6LvezfCLBtratihTCwXmy1PcS5EzccaHekMYHhNU4SaxxAtAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVI7/D71vcwoHX4mTAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    );
  }
);

// binsvg
export const DeleteBinSVG = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        style={props.style}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        <rect x="0.5" y="0.5" width="27" height="27" rx="3.5" fill="#FCE6EA" />
        <rect
          x="0.5"
          y="0.5"
          width="27"
          height="27"
          rx="3.5"
          stroke="#F6B0BE"
        />
        <path
          d="M7.49512 9.27148H20.1041L18.9702 21.1108H8.62904L7.49512 9.27148Z"
          stroke="#EB5472"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M17.3816 8.90842L16.5266 6.31055H11.0747L10.2197 8.90842"
          stroke="#EB5472"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M13.8008 13.2021V17.1805"
          stroke="#EB5472"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    );
  }
);

// PeopleIcon
export const MedUserGroupIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.4129 15.9066C21.7121 13.712 19.8545 12.4564 17.3057 12.4564H17.2875C16.2488 12.4468 15.3205 12.6561 14.5371 13.0564C16.723 13.7581 18.3435 15.3153 19.0894 17.5185C20.2731 17.3543 21.3022 16.9905 22.2123 16.4346L22.5128 16.2436L22.4129 15.9066Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.6387 10.7989C16.1302 11.0725 16.686 11.2271 17.287 11.2271C19.1715 11.2271 20.7008 9.69685 20.7008 7.81235C20.7008 5.93747 19.1715 4.40723 17.287 4.40723C16.9136 4.40723 16.5584 4.47155 16.2214 4.58003C16.7129 5.37299 16.9952 6.30995 16.9952 7.30259C16.9952 8.65043 16.494 9.87061 15.6387 10.7989Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.93837 13.0388C8.17325 12.6567 7.27181 12.4561 6.25229 12.4561H6.21581C3.66701 12.4561 1.80941 13.7127 1.11725 15.9063L1.00781 16.2433L1.30829 16.4343C2.17325 16.9633 3.19373 17.3175 4.33133 17.4999C5.08685 15.2881 6.73517 13.7213 8.93837 13.0388Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.23308 11.2261C6.83404 11.2261 7.38892 11.0716 7.8814 10.798C7.02508 9.86964 6.52396 8.64945 6.52396 7.30161C6.52396 6.30993 6.8062 5.37201 7.29868 4.58001C6.96172 4.47057 6.60652 4.40625 6.23308 4.40625C4.3486 4.40625 2.81836 5.93649 2.81836 7.81137C2.81836 9.69684 4.3486 11.2261 6.23308 11.2261Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7271 13.5391C11.7117 13.5391 11.6973 13.5391 11.6829 13.5391C8.40545 13.5391 6.01601 15.1499 5.12705 17.9618L5.01953 18.3016L5.32385 18.4879C7.05953 19.5458 9.13313 20.0603 11.6627 20.0603H11.7443C14.2759 20.0603 16.3504 19.5458 18.0861 18.4879L18.3914 18.3016L18.2839 17.9618C17.3939 15.1499 15.0055 13.5391 11.7271 13.5391Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7593 11.6339C14.1459 11.6339 16.087 9.69279 16.087 7.30621C16.087 4.92061 14.1459 2.97949 11.7593 2.97949C9.37276 2.97949 7.43164 4.92061 7.43164 7.30621C7.43164 9.69279 9.37276 11.6339 11.7593 11.6339Z"
          fill="white"
        />
      </svg>
    );
  }
);

//MedDashboardIcon
export const MedDashboardIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 2.95508H10.5V11.4551H2V2.95508ZM3.5 4.45508V9.95508H9V4.45508H3.5Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.2449 2L22.4553 4.19996L20.2553 12.4104L12.0449 10.2104L14.2449 2ZM15.3056 3.83712L13.8821 9.14971L19.1946 10.5733L20.6182 5.26062L15.3056 3.83712Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 13.9551H10.5V22.4551H2V13.9551ZM3.5 15.4551V20.9551H9V15.4551H3.5Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 13.9551H21.5V22.4551H13V13.9551ZM14.5 15.4551V20.9551H20V15.4551H14.5Z"
          fill="white"
        />
      </svg>
    );
  }
);

// MedClaimsIcon
export const MedClaimsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.1216 4.39844V7.9874H12.6816V4.39844H14.1216Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.1216 16.3945V19.6318H12.6816V16.3945H14.1216Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.1216 9.33105V15.0521H12.6816V9.33105H14.1216Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.16016 4.17578H21.3602V10.8109H20.6402C19.9591 10.8109 19.4273 11.349 19.4273 12.0007C19.4273 12.6519 19.9586 13.1895 20.6402 13.1895H21.3602V19.8238H2.16016V13.1895H2.88016C3.56167 13.1895 4.09305 12.6519 4.09305 12.0007C4.09305 11.3861 3.59983 10.8859 2.88016 10.8859H2.16016V4.17578ZM3.60016 5.61578V9.5387C4.69333 9.82682 5.53305 10.7619 5.53305 12.0007C5.53305 13.2142 4.71267 14.2228 3.60016 14.5319V18.3838H19.9202V14.5319C18.8076 14.2228 17.9873 13.2142 17.9873 12.0007C17.9873 10.7875 18.8074 9.77805 19.9202 9.46866V5.61578H3.60016Z"
          fill="white"
        />
      </svg>
    );
  }
);

// MedRemittanceIcon
export const MedRemittanceIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21.5 19.06V5H3V19.06H21.5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M3.07031 9.81348H21.5015"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M15.1035 15.3721H18.5785"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M10.877 15.3721H11.625"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    );
  }
);

// MedUserManagementIcon
export const MedUserManagementIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21.5 19.06V5H3V19.06H21.5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M3.07031 9.81348H21.5015"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M15.1035 15.3721H18.5785"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M10.877 15.3721H11.625"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    );
  }
);

// MedActivitylogIcon
export const MedActivitylogIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.32227 15.0361H15.2656V16.5361H8.32227V15.0361Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.32227 11.2539H13.2051V12.7539H8.32227V11.2539Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 1.5H15.3123L20.8493 7.26648V21.5H4V1.5ZM5.5 3V20H19.3493V7.87004L14.6731 3H5.5Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.2656 2.05469V7.40011H20.3727V8.90011H13.7656V2.05469H15.2656Z"
          fill="white"
        />
      </svg>
    );
  }
);

// MedGearIcon
export const MedGearIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7601 9.18023C10.2026 9.18023 8.94 10.4428 8.94 12.0003C8.94 13.5578 10.2026 14.8203 11.7601 14.8203C13.3175 14.8203 14.5801 13.5578 14.5801 12.0003C14.5801 10.4428 13.3175 9.18023 11.7601 9.18023ZM7.5 12.0003C7.5 9.64749 9.40729 7.74023 11.7601 7.74023C14.1128 7.74023 16.0201 9.64749 16.0201 12.0003C16.0201 14.353 14.1128 16.2603 11.7601 16.2603C9.40729 16.2603 7.5 14.353 7.5 12.0003Z"
          fill="#0F0F0F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.50525 2.25293L11.761 4.02784L14.0168 2.25293L19.0753 5.17341L18.6661 8.01432L21.3295 9.07979V14.9208L18.6652 15.9866L19.0743 18.8269L14.0159 21.7474L11.761 19.9734L9.5063 21.7474L4.44788 18.8269L4.85691 15.9871L2.19141 14.9208V9.07979L4.85595 8.01383L4.44683 5.17341L9.50525 2.25293ZM6.01111 5.93304L6.44277 8.92999L3.63141 10.0546V13.9459L6.44373 15.0709L6.01215 18.0674L9.38202 20.0129L11.761 18.141L14.1401 20.0129L17.51 18.0674L17.0784 15.0704L19.8895 13.9459V10.0546L17.0793 8.93048L17.5111 5.93304L14.1412 3.98745L11.761 5.86014L9.38098 3.98745L6.01111 5.93304Z"
          fill="#0F0F0F"
        />
      </svg>
    );
  }
);

// MedBellIcon
export const MedBellIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4.85066 7.44848C4.85066 4.60063 7.06695 2.29199 9.80088 2.29199C12.5348 2.29199 14.7511 4.60063 14.7511 7.44847V11.2657L16.0412 14.8813H3.56055L4.85066 11.2657V7.44848Z"
          stroke="#0F0F0F"
          strokeWidth="1.5"
        />
        <path
          d="M12.3343 14.8809V15.0692C12.3343 16.5266 11.2 17.7081 9.8009 17.7081C8.40178 17.7081 7.26758 16.5266 7.26758 15.0692V14.8809"
          stroke="#0F0F0F"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
);
// MedSearchIcon
export const MedSearchIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        ref={ref}
        className={props.className}
        style={props.style}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        <path
          d="M14.1667 12.5H13.3417L13.0583 12.225C14.0417 11.0917 14.6667 9.61667 14.6667 8C14.6667 4.65 11.85 1.83333 8.5 1.83333C5.15 1.83333 2.33333 4.65 2.33333 8C2.33333 11.35 5.15 14.1667 8.5 14.1667C10.1167 14.1667 11.5917 13.5417 12.725 12.5583L13 12.8417V13.6667L17.8333 18.4917L19.1583 17.1667L14.1667 12.5ZM8.5 12.5C6.01667 12.5 4 10.4833 4 8C4 5.51667 6.01667 3.5 8.5 3.5C10.9833 3.5 13 5.51667 13 8C13 10.4833 10.9833 12.5 8.5 12.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

// MedEmptyBoxIcon
export const MedEmptyBoxIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="122"
        height="121"
        viewBox="0 0 122 121"
        fill="none"
      >
        <path
          d="M104.878 31.4608V31.4463C104.878 31.4487 104.877 31.4511 104.876 31.4535C104.876 31.4511 104.875 31.4487 104.874 31.4463V31.4608C104.684 32.1501 104.245 32.643 103.557 32.9394C104.245 33.2359 104.684 33.7288 104.874 34.418V34.4326C104.875 34.4302 104.876 34.4277 104.876 34.4253C104.877 34.4277 104.878 34.4302 104.878 34.4326V34.418C105.068 33.7288 105.508 33.2359 106.196 32.9394C105.508 32.643 105.068 32.1501 104.878 31.4608Z"
          fill="#B6BBC5"
        />
        <path
          d="M78.3901 13.3553V13.3408C78.3893 13.3432 78.3885 13.3457 78.3881 13.3481C78.3873 13.3457 78.3865 13.3432 78.3861 13.3408V13.3553C78.1961 14.0446 77.7568 14.5375 77.0684 14.834C77.7568 15.1304 78.1961 15.6233 78.3861 16.3126V16.3271C78.3869 16.3247 78.3877 16.3223 78.3881 16.3198C78.3889 16.3223 78.3897 16.3247 78.3901 16.3271V16.3126C78.5801 15.6233 79.0193 15.1304 79.7078 14.834C79.0193 14.5375 78.5801 14.0446 78.3901 13.3553Z"
          fill="#B6BBC5"
        />
        <path
          d="M38.1674 76.9403V76.9258C38.1666 76.9282 38.1658 76.9306 38.1654 76.933C38.1646 76.9306 38.1638 76.9282 38.1634 76.9258V76.9403C37.9734 77.6296 37.5342 78.1225 36.8457 78.4189C37.5342 78.7154 37.9734 79.2082 38.1634 79.8975V79.9121C38.1642 79.9096 38.165 79.9072 38.1654 79.9048C38.1662 79.9072 38.167 79.9096 38.1674 79.9121V79.8975C38.3574 79.2082 38.7966 78.7154 39.4851 78.4189C38.7966 78.1225 38.3574 77.6296 38.1674 76.9403Z"
          fill="#B6BBC5"
        />
        <path
          d="M16.3979 57.4247V57.4102C16.3971 57.4126 16.3963 57.415 16.3959 57.4174C16.3951 57.415 16.3943 57.4126 16.3939 57.4102V57.4247C16.2039 58.114 15.7647 58.6068 15.0762 58.9033C15.7647 59.1997 16.2039 59.6926 16.3939 60.3819V60.3964C16.3947 60.394 16.3955 60.3916 16.3959 60.3892C16.3967 60.3916 16.3975 60.394 16.3979 60.3964V60.3819C16.5879 59.6926 17.0271 59.1997 17.7156 58.9033C17.0271 58.6068 16.5879 58.114 16.3979 57.4247Z"
          fill="#B6BBC5"
        />
        <path
          d="M16.3993 80.465V80.4355C16.3981 80.4408 16.3965 80.4452 16.3953 80.4505C16.3941 80.4452 16.3924 80.4408 16.3912 80.4355V80.465C16.0113 81.8432 15.1328 82.8293 13.7559 83.4222C15.1328 84.0151 16.0109 85.0013 16.3912 86.3795V86.4089C16.3924 86.4037 16.3941 86.3992 16.3953 86.394C16.3965 86.3992 16.3981 86.4037 16.3993 86.4089V86.3795C16.7792 85.0013 17.6577 84.0151 19.0347 83.4222C17.6577 82.8293 16.7796 81.8432 16.3993 80.465Z"
          fill="#B6BBC5"
        />
        <path
          d="M100.737 8.8898V8.86035C100.736 8.86559 100.734 8.87003 100.733 8.87528C100.732 8.87003 100.73 8.86559 100.729 8.86035V8.8898C100.349 10.268 99.4707 11.2541 98.0938 11.847C99.4707 12.4399 100.349 13.4261 100.729 14.8043V14.8337C100.73 14.8285 100.732 14.824 100.733 14.8188C100.734 14.824 100.736 14.8285 100.737 14.8337V14.8043C101.117 13.4261 101.996 12.4399 103.373 11.847C101.996 11.2541 101.118 10.268 100.737 8.8898Z"
          fill="#B6BBC5"
        />
        <path
          d="M116.447 115.958C101.762 102.723 82.3191 94.667 60.9937 94.667C39.6683 94.667 20.2252 102.723 5.54102 115.958"
          fill="white"
        />
        <path
          d="M116.447 116.16C116.399 116.16 116.35 116.143 116.312 116.108C112.646 112.805 108.666 109.814 104.48 107.22C100.249 104.597 95.7597 102.349 91.1371 100.538C81.5378 96.7761 71.3963 94.8692 60.994 94.8692C50.5916 94.8692 40.4502 96.7765 30.8509 100.538C26.2279 102.349 21.7388 104.597 17.5082 107.22C13.3224 109.814 9.3415 112.805 5.67641 116.108C5.59372 116.183 5.46627 116.176 5.39165 116.093C5.31704 116.011 5.32389 115.883 5.40658 115.809C9.08982 112.489 13.0897 109.484 17.296 106.877C21.5476 104.241 26.0585 101.982 30.704 100.162C40.3506 96.3821 50.5416 94.4658 60.9944 94.4658C71.4472 94.4658 81.6382 96.3825 91.2847 100.162C95.9303 101.982 100.442 104.242 104.693 106.877C108.899 109.484 112.899 112.489 116.582 115.809C116.665 115.883 116.671 116.011 116.597 116.093C116.557 116.138 116.502 116.16 116.447 116.16L116.447 116.16Z"
          fill="#626C82"
        />
        <path
          d="M13.6602 109.51V106.13C13.6602 106.13 18.1569 101.226 23.5507 98.2024C32.8116 93.0107 37.5637 93.6359 37.5637 93.6359L44.153 96.3805C44.153 96.3805 39.7945 102.518 30.9874 106.972C24.5623 110.222 19.1302 111.463 19.1302 111.463"
          fill="white"
        />
        <path
          d="M19.1315 111.664C19.0395 111.664 18.9564 111.601 18.935 111.507C18.91 111.399 18.9782 111.29 19.0867 111.265C19.1407 111.253 24.5708 109.991 30.8975 106.792C35.4249 104.502 38.746 101.758 40.7348 99.8596C42.4312 98.2402 43.469 96.9479 43.8376 96.4664L37.5138 93.8322C37.3335 93.8144 36.1562 93.7277 34.0399 94.1754C30.1965 94.9889 26.2684 96.9096 23.65 98.3774C18.6567 101.176 14.3838 105.653 13.8623 106.209V109.509C13.8623 109.621 13.772 109.711 13.6607 109.711C13.5493 109.711 13.459 109.621 13.459 109.509V106.13C13.459 106.079 13.4779 106.031 13.5118 105.993C13.557 105.944 18.0925 101.031 23.4524 98.0256C26.1051 96.5385 30.0868 94.5937 33.9891 93.7741C36.3413 93.28 37.5404 93.4285 37.5904 93.4353C37.6082 93.4377 37.6251 93.4422 37.6416 93.449L44.2309 96.1937C44.2874 96.2171 44.3301 96.2655 44.3471 96.3244C44.364 96.3833 44.3531 96.4466 44.3176 96.4966C44.3067 96.5119 43.1915 98.0708 41.0123 100.152C39.0037 102.069 35.65 104.84 31.0786 107.152C24.7051 110.375 19.2299 111.646 19.1754 111.659C19.1605 111.662 19.1452 111.664 19.1303 111.664H19.1315Z"
          fill="#626C82"
        />
        <path
          d="M16.3951 106.401C16.3145 106.401 16.2382 106.353 16.2072 106.273C16.1669 106.169 16.2177 106.052 16.3213 106.012C16.3346 106.006 17.7386 105.451 24.4489 102.353C31.1277 99.2692 33.6897 96.4801 33.7151 96.4523C33.7897 96.3696 33.9172 96.3632 33.9998 96.4374C34.0825 96.512 34.0894 96.6395 34.0148 96.7221C33.9885 96.7516 33.3525 97.4514 31.871 98.5456C30.5114 99.5495 28.1491 101.089 24.6179 102.719C17.8843 105.828 16.523 106.366 16.4681 106.387C16.4439 106.396 16.4193 106.401 16.3947 106.401L16.3951 106.401Z"
          fill="#626C82"
        />
        <path
          d="M76.0137 96.0282C76.0137 96.0282 80.9517 94.667 81.6579 94.667C83.7415 94.667 87.0364 95.0461 94.5718 98.5406C102.107 102.035 106.602 105.871 106.602 105.871L109.289 110.189C109.289 110.189 102.092 111.113 92.2248 107.291C82.3577 103.468 77.4435 99.3182 77.4435 99.3182"
          fill="white"
        />
        <path
          d="M107.164 110.49C106.426 110.49 105.511 110.461 104.441 110.374C101.66 110.148 97.2714 109.462 92.1519 107.478C89.3306 106.385 85.1109 104.555 81.0284 102.043C78.5818 100.537 77.3258 99.4827 77.3133 99.4722C77.2282 99.4004 77.2173 99.273 77.2895 99.1879C77.3613 99.1028 77.4883 99.0919 77.5738 99.1637C77.5859 99.1742 78.8258 100.214 81.2502 101.705C83.4879 103.082 87.2208 105.135 92.2979 107.102C97.3658 109.065 101.708 109.746 104.459 109.971C106.72 110.156 108.305 110.072 108.947 110.019L106.448 106.004C106.087 105.702 101.632 102.036 94.4872 98.7228C91.1008 97.1522 88.3311 96.0939 86.0196 95.4877C83.9259 94.9384 82.5893 94.8682 81.6584 94.8682C81.1018 94.8682 77.4339 95.8454 76.0678 96.2222C75.9601 96.2516 75.8492 96.1887 75.8197 96.0814C75.7903 95.9741 75.8532 95.8628 75.9605 95.8334C76.4687 95.6934 80.9453 94.4648 81.6584 94.4648C83.936 94.4648 87.2615 94.9275 94.657 98.357C98.5617 100.168 101.635 102.071 103.526 103.349C105.577 104.735 106.722 105.707 106.733 105.717C106.749 105.73 106.763 105.746 106.774 105.764L109.461 110.082C109.497 110.141 109.501 110.213 109.472 110.276C109.442 110.338 109.384 110.38 109.315 110.389C109.267 110.395 108.508 110.489 107.164 110.489L107.164 110.49Z"
          fill="#626C82"
        />
        <path
          d="M103.558 106.04C103.55 106.04 103.543 106.04 103.536 106.039C103.48 106.033 97.8845 105.401 91.7151 102.662C89.936 101.872 87.3393 100.602 85.071 99.0378C83.7065 98.0968 83.114 97.5011 83.0894 97.4761C83.0111 97.3966 83.0119 97.2692 83.0914 97.1909C83.1705 97.1127 83.2983 97.1135 83.3766 97.193C83.4056 97.2224 85.7913 99.5904 91.8788 102.293C97.9877 105.005 103.524 105.632 103.579 105.638C103.69 105.65 103.77 105.749 103.758 105.86C103.747 105.963 103.659 106.04 103.558 106.04V106.04Z"
          fill="#626C82"
        />
        <path
          d="M64.1078 95.5002C62.9288 96.6981 61.687 96.767 60.3822 95.7083L57.8359 50.1046L61.5615 49.8965L64.1078 95.5002Z"
          fill="#44506A"
        />
        <path
          d="M62.1775 96.6547C61.547 96.6547 60.9005 96.3894 60.2536 95.8642C60.2096 95.8283 60.1826 95.7755 60.1793 95.719L57.6331 50.1153C57.6303 50.0621 57.6484 50.0096 57.6839 49.9697C57.7194 49.9298 57.7694 49.9056 57.8231 49.9028L61.5487 49.6946C61.6596 49.6886 61.7552 49.7737 61.7612 49.8846L64.3071 95.4883C64.3103 95.5452 64.2893 95.6004 64.2494 95.6412C63.6266 96.274 62.9712 96.614 62.3013 96.6515C62.2597 96.6539 62.2182 96.6551 62.1766 96.6551L62.1775 96.6547ZM60.577 95.6061C61.7487 96.5216 62.8373 96.4607 63.8997 95.4205L61.37 50.1085L58.0473 50.294L60.577 95.6061Z"
          fill="#626C82"
        />
        <path
          d="M81.4116 52.8343L81.2499 43.8436C81.2317 39.9196 78.3632 33.3827 74.319 32.852L48.8654 29.5107L45.7227 53.4546L66.3056 56.1562L71.1762 56.7954L76.0469 57.4347C78.9557 57.8167 81.4265 55.6568 81.4116 52.8339V52.8343Z"
          fill="#B6BBC5"
        />
        <path
          d="M76.701 57.6801C76.4751 57.6801 76.2472 57.6652 76.0193 57.6353L45.6951 53.6549C45.5846 53.6403 45.5068 53.5391 45.5213 53.4286L48.664 29.4847C48.6709 29.4319 48.6987 29.3835 48.7411 29.3512C48.7834 29.3185 48.8371 29.3044 48.8903 29.3113L74.3439 32.6525C76.2278 32.8997 78.0477 34.4356 79.4686 36.9774C80.6811 39.1461 81.4405 41.7771 81.4502 43.8434L81.6119 52.8312C81.6119 52.8312 81.6119 52.8329 81.6119 52.8337C81.6192 54.2223 81.0303 55.5424 79.9962 56.4548C79.0951 57.2498 77.9223 57.6801 76.701 57.6801ZM45.9476 53.2814L76.0722 57.2356C77.4161 57.4123 78.7491 57.017 79.7296 56.1523C80.6762 55.3174 81.2155 54.109 81.209 52.8369L81.0473 43.8474C81.038 41.8428 80.2983 39.2869 79.1169 37.1738C77.7597 34.7462 76.0459 33.2825 74.2919 33.0522L49.0379 29.7372L45.9476 53.281V53.2814Z"
          fill="#626C82"
        />
        <path
          d="M50.5923 54.0946L40.851 52.816C37.9421 52.4341 36.1122 49.71 36.8552 46.9867L39.3316 38.3424C40.3621 34.5559 44.8202 28.9811 48.864 29.5118C52.9078 30.0426 55.7763 36.5791 55.7949 40.5035L55.9566 49.4942C55.9719 52.3171 53.5007 54.4766 50.5919 54.095L50.5923 54.0946Z"
          fill="#44506A"
        />
        <path
          d="M51.2476 54.339C51.0217 54.339 50.7939 54.3241 50.566 54.2942L40.8247 53.0156C39.3654 52.8241 38.0759 52.0343 37.2874 50.8485C36.5235 49.7002 36.2952 48.2729 36.6607 46.933L39.1379 38.2859C39.6796 36.2951 41.0921 33.9493 42.8236 32.1665C44.8524 30.0777 47.0066 29.0637 48.8909 29.3109C50.7749 29.5582 52.5947 31.0941 54.0157 33.6359C55.2281 35.8046 55.9876 38.4356 55.9973 40.5018L56.159 49.4897C56.1667 50.8812 55.5774 52.2009 54.5432 53.1133C53.6422 53.9082 52.4693 54.3386 51.248 54.3386L51.2476 54.339ZM50.6184 53.8945C51.9623 54.0708 53.2953 53.6759 54.2758 52.8112C55.2229 51.9759 55.7621 50.7671 55.7553 49.4945L55.5935 40.5063C55.5842 38.5017 54.8445 35.9458 53.6632 33.8327C52.306 31.405 50.5922 29.9414 48.8381 29.711C47.0836 29.4807 45.0504 30.4528 43.1128 32.4477C41.4264 34.184 40.0523 36.4628 39.5263 38.3944L37.0491 47.0415C36.7147 48.2664 36.9236 49.5736 37.623 50.6247C38.347 51.7133 39.5332 52.4389 40.8771 52.6151L50.6184 53.8937V53.8945Z"
          fill="#626C82"
        />
        <path
          d="M50.936 54.1399L41.5368 52.9061C38.7304 52.5379 35.4642 53.7467 34.478 55.4766L31.451 60.9921C30.0769 63.3972 30.6589 67.5342 34.5607 68.0464C38.4626 68.5587 44.9502 65.3494 47.3363 63.0774L52.9092 57.8962C54.6273 56.2623 53.7428 54.5086 50.9364 54.1403L50.936 54.1399Z"
          fill="white"
        />
        <path
          d="M35.4307 68.3017C35.1193 68.3017 34.8197 68.284 34.5337 68.2465C32.513 67.9811 31.543 66.8255 31.0852 65.9031C30.3423 64.4055 30.4185 62.3917 31.2752 60.8925L34.3002 55.3801C34.8039 54.4964 35.8526 53.7289 37.2546 53.2154C38.6477 52.7056 40.1775 52.5249 41.5622 52.7064L50.9615 53.9402C52.5337 54.1467 53.6065 54.7909 53.9054 55.708C54.149 56.4554 53.8441 57.2843 53.0467 58.0421L47.4722 63.225C45.1587 65.428 39.3757 68.3013 35.4303 68.3017H35.4307ZM40.501 53.042C38.0588 53.042 35.4888 54.1104 34.6527 55.5766L31.6273 61.0893C30.8327 62.48 30.7605 64.3414 31.4466 65.7236C31.8608 66.5585 32.7417 67.6044 34.5861 67.8464C36.3063 68.0722 38.7393 67.5656 41.4371 66.4202C43.7692 65.43 45.9759 64.0933 47.1963 62.9309L52.7708 57.7481C53.4472 57.1048 53.7146 56.424 53.5222 55.8327C53.277 55.0805 52.3005 54.5222 50.9094 54.3395L41.5102 53.1057C41.1798 53.0622 40.8414 53.0416 40.501 53.0416V53.042Z"
          fill="#626C82"
        />
        <path
          d="M68.3913 26.0481L63.4805 25.4033L63.0336 28.8069L67.9444 29.4517L68.3913 26.0481Z"
          fill="white"
        />
        <path
          d="M67.9467 29.6505C67.9378 29.6505 67.929 29.6501 67.9201 29.6489L63.0095 29.0044C62.9563 28.9975 62.9083 28.9697 62.8756 28.9274C62.8429 28.885 62.8288 28.8314 62.8357 28.7781L63.2826 25.3748C63.2971 25.2643 63.3987 25.1864 63.5088 25.201L68.4194 25.8455C68.4727 25.8523 68.5207 25.8802 68.5533 25.9225C68.586 25.9649 68.6001 26.0185 68.5933 26.0718L68.1464 29.4751C68.1331 29.5767 68.0463 29.6505 67.9467 29.6505ZM63.262 28.6305L67.7729 29.2226L68.1669 26.219L63.6561 25.6269L63.262 28.6305Z"
          fill="#626C82"
        />
        <path
          d="M76.3522 42.8211L69.9837 41.9849C69.4598 41.9161 68.9794 42.285 68.9106 42.8089L68.8916 42.9537C68.8228 43.4776 69.1918 43.958 69.7156 44.0268L76.0841 44.8629C76.6079 44.9317 77.0884 44.5628 77.1572 44.0389L77.1762 43.8942C77.245 43.3703 76.876 42.8898 76.3522 42.8211Z"
          fill="white"
        />
        <path
          d="M76.2118 45.0698C76.1618 45.0698 76.1114 45.0666 76.0601 45.0597L69.6915 44.2236C69.3846 44.1833 69.1119 44.026 68.9235 43.7807C68.7352 43.5355 68.6533 43.2314 68.6936 42.9245L68.7126 42.7793C68.7957 42.146 69.3785 41.6983 70.0117 41.7814L76.3804 42.6175C76.6873 42.6579 76.96 42.8152 77.1483 43.0604C77.3367 43.3056 77.4186 43.6097 77.3782 43.9167L77.3593 44.0619C77.2826 44.6443 76.7837 45.0694 76.2118 45.0694V45.0698ZM76.1126 44.66C76.5256 44.714 76.9051 44.4224 76.9596 44.0098L76.9785 43.8646C77.0047 43.6646 76.9515 43.4665 76.8289 43.3064C76.7059 43.1463 76.5284 43.0438 76.3283 43.0176L69.9597 42.1815C69.5471 42.1275 69.1672 42.4191 69.1127 42.8317L69.0938 42.9769C69.0675 43.1769 69.1208 43.375 69.2434 43.5351C69.3664 43.6952 69.5439 43.7977 69.7439 43.8239L76.1126 44.66Z"
          fill="#626C82"
        />
        <path
          d="M75.7643 47.2937L69.3958 46.4576C68.872 46.3888 68.3915 46.7577 68.3227 47.2816L68.3037 47.4263C68.2349 47.9502 68.6039 48.4307 69.1277 48.4994L75.4962 49.3356C76.02 49.4044 76.5005 49.0355 76.5693 48.5116L76.5883 48.3668C76.6571 47.8429 76.2881 47.3625 75.7643 47.2937Z"
          fill="white"
        />
        <path
          d="M75.6239 49.5434C75.5739 49.5434 75.5231 49.5402 75.4722 49.5333L69.1036 48.6972C68.7967 48.6569 68.524 48.4996 68.3357 48.2544C68.1473 48.0091 68.0654 47.705 68.1058 47.3981L68.1247 47.2529C68.1651 46.9463 68.3224 46.6733 68.5676 46.4849C68.8128 46.2966 69.1169 46.2151 69.4239 46.255L75.7925 47.0911C76.4257 47.1742 76.8734 47.757 76.7903 48.3903L76.7714 48.5355C76.6951 49.1179 76.1958 49.543 75.6239 49.543V49.5434ZM69.2722 46.6491C69.1068 46.6491 68.9471 46.7031 68.814 46.8056C68.6543 46.9286 68.5514 47.1061 68.5252 47.3061L68.5063 47.4513C68.4801 47.6514 68.5333 47.8494 68.6559 48.0095C68.7789 48.1697 68.9564 48.2721 69.1564 48.2983L75.5251 49.1344C75.9385 49.1885 76.3176 48.8969 76.3721 48.4843L76.391 48.3391C76.4451 47.9264 76.1535 47.5465 75.7409 47.4925L69.3722 46.6563C69.3387 46.6519 69.3057 46.6499 69.2726 46.6499L69.2722 46.6491Z"
          fill="#626C82"
        />
        <path
          d="M101.166 79.047C107.334 79.047 112.335 74.0463 112.335 67.8775C112.335 61.7088 107.334 56.708 101.166 56.708C94.9969 56.708 89.9961 61.7088 89.9961 67.8775C89.9961 74.0463 94.9969 79.047 101.166 79.047Z"
          fill="#B6BBC5"
        />
        <path
          d="M103.367 56.9258C103.434 58.6032 103.321 60.3537 102.762 61.5343C101.36 64.4919 99.1812 65.426 94.1997 67.8779C92.1596 68.8822 91.3243 70.7545 91.0488 72.615C91.8422 74.3066 93.0473 75.7667 94.5352 76.8662C94.8712 75.4602 95.5061 73.8956 96.6903 72.5868C99.6479 69.3178 104.162 72.4311 109.385 69.7849C110.769 69.0835 111.677 67.9227 112.262 66.5953C111.709 61.7622 108.072 57.8664 103.367 56.9258Z"
          fill="#626C82"
        />
        <path
          d="M22.1952 32.9373C27.3081 32.9373 31.4529 28.7925 31.4529 23.6796C31.4529 18.5667 27.3081 14.4219 22.1952 14.4219C17.0823 14.4219 12.9375 18.5667 12.9375 23.6796C12.9375 28.7925 17.0823 32.9373 22.1952 32.9373Z"
          fill="#E8E9EC"
        />
        <path
          d="M8.17937 31.9017C7.35738 31.9017 6.87661 31.7202 6.71366 31.3499C6.48134 30.8211 6.97744 30.0629 8.23019 29.0319C9.34541 28.1144 11.0406 27.0048 13.1323 25.8226C13.2291 25.7678 13.3521 25.8021 13.407 25.8989C13.4618 25.9957 13.4275 26.1187 13.3307 26.1735C11.2592 27.3444 9.58418 28.4403 8.48671 29.3433C6.97784 30.5848 7.03068 31.0688 7.08311 31.1874C7.14644 31.3318 7.69053 31.9908 12.1873 30.8058C15.3317 29.977 19.3549 28.5129 23.5165 26.6825C27.6781 24.8522 31.4767 22.8767 34.2125 21.1194C38.1253 18.6062 38.0071 17.7596 37.9438 17.6152C37.8921 17.4978 37.5755 17.1348 35.671 17.3986C34.2851 17.5906 32.3725 18.0734 30.1389 18.7949C30.0328 18.8292 29.919 18.7711 29.8852 18.6651C29.8509 18.559 29.909 18.4453 30.015 18.4114C32.2705 17.683 34.2069 17.1945 35.6157 16.9993C37.2 16.7799 38.0821 16.9283 38.3132 17.4531C38.4996 17.877 38.2221 18.4412 37.4642 19.1781C36.7971 19.8271 35.7766 20.5942 34.4307 21.4586C31.6776 23.2268 27.8592 25.2132 23.6791 27.0516C19.4989 28.89 15.4543 30.3617 12.2901 31.1958C10.7434 31.6036 9.48819 31.8371 8.55931 31.89C8.42541 31.8976 8.29916 31.9013 8.17978 31.9013L8.17937 31.9017Z"
          fill="#626C82"
        />
        <path
          d="M63.7719 25.4409L62.459 25.2686L60.0706 43.4593L61.3835 43.6316L63.7719 25.4409Z"
          fill="white"
        />
        <path
          d="M61.3857 43.8315C61.3769 43.8315 61.3684 43.8311 61.3595 43.8299L60.0467 43.6577C59.9362 43.6432 59.8583 43.5419 59.8728 43.4314L62.2606 25.2407C62.2674 25.1879 62.2953 25.1395 62.3376 25.1072C62.38 25.0745 62.4336 25.06 62.4868 25.0673L63.7997 25.2395C63.9102 25.254 63.988 25.3552 63.9735 25.4658L61.5858 43.6565C61.5789 43.7093 61.5511 43.7577 61.5088 43.79C61.4733 43.817 61.4301 43.8315 61.3861 43.8315H61.3857ZM60.2992 43.2838L61.2119 43.4036L63.5472 25.613L62.6345 25.4932L60.2992 43.2838Z"
          fill="#626C82"
        />
        <path
          d="M61.7585 46.8168C63.1126 46.8168 64.2104 45.7191 64.2104 44.3649C64.2104 43.0108 63.1126 41.9131 61.7585 41.9131C60.4044 41.9131 59.3066 43.0108 59.3066 44.3649C59.3066 45.7191 60.4044 46.8168 61.7585 46.8168Z"
          fill="white"
        />
        <path
          d="M61.7651 47.0189C61.6485 47.0189 61.5316 47.0112 61.4142 46.9959C60.7116 46.9035 60.0868 46.5433 59.6549 45.9811C59.2233 45.4188 59.0362 44.7223 59.1285 44.0197C59.2209 43.3171 59.5811 42.6923 60.1433 42.2603C60.7056 41.8288 61.4021 41.6416 62.1047 41.734C63.5555 41.9244 64.5808 43.2594 64.3904 44.7102C64.298 45.4128 63.9379 46.0376 63.3756 46.4695C62.9074 46.8293 62.3455 47.0189 61.7647 47.0189H61.7651ZM61.755 42.1143C61.2626 42.1143 60.7862 42.2753 60.3889 42.5802C59.9122 42.9464 59.6065 43.476 59.5282 44.0721C59.45 44.6682 59.6085 45.2587 59.9747 45.7355C60.3409 46.2122 60.8705 46.5179 61.4666 46.5962C62.0624 46.6744 62.6533 46.5159 63.13 46.1497C63.6067 45.7835 63.9125 45.2539 63.9907 44.6578C64.152 43.4276 63.2829 42.2954 62.0523 42.1337C61.9527 42.1208 61.8534 42.1143 61.7546 42.1143H61.755Z"
          fill="#626C82"
        />
      </svg>
    );
  }
);

export const SearchNoResultsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        width="130"
        height="137"
        viewBox="0 0 130 137"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            d="M61.9352 19.7427C32.8189 19.7371 9.20887 43.332 9.19581 72.4483C9.18274 101.565 32.7716 125.181 61.8878 125.201C91.0041 125.222 114.626 101.639 114.654 72.5227C114.67 58.5302 109.123 45.1052 99.2348 35.2053C89.3463 25.3053 75.9277 19.7427 61.9352 19.7427Z"
            stroke="#3A4374"
            strokeWidth="1.04545"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="89.5737"
            cy="55.3184"
            rx="2.436"
            ry="3.62355"
            fill="#231F20"
          />
          <path
            d="M0 56.8512L123.83 29.4462L99.47 22.3412C99.47 22.3412 86.275 0.467961 82.753 0.0112108C79.2309 -0.445539 15.225 13.2062 15.225 13.2062L11.165 44.0216L0 56.8512Z"
            fill="#3A4374"
          />
          <path
            d="M25.781 131.048L11.7842 108.921L72.9684 98.4561L77.1705 119.659L83.3823 100.131L114.685 106.312L108.321 131.048H25.781Z"
            fill="#3A4374"
          />
          <path
            d="M104.182 83.0669L109.823 82.2862L112.736 103.34C112.939 104.806 111.915 106.158 110.449 106.361L110.118 106.407C108.652 106.61 107.299 105.586 107.096 104.12L104.182 83.0669H104.182Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M106.595 104.201C106.817 105.775 108.162 106.947 109.752 106.952C109.891 106.951 110.03 106.941 110.168 106.921L110.493 106.871C111.332 106.76 112.092 106.318 112.604 105.642C113.115 104.967 113.334 104.116 113.213 103.277L110.32 82.2263C110.306 82.0925 110.236 81.9708 110.127 81.8914C110.021 81.809 109.885 81.7725 109.752 81.7899L104.118 82.5714C103.841 82.6083 103.646 82.8625 103.682 83.1398L106.595 104.201ZM107.6 104.059L104.758 83.5052L109.386 82.9165L112.228 103.47C112.391 104.655 111.565 105.749 110.381 105.916H110.046C108.859 106.073 107.768 105.244 107.6 104.059Z"
            fill="#3A4374"
          />
          <rect
            x="99.8501"
            y="64.4839"
            width="9.18575"
            height="20.7872"
            transform="rotate(-7.88 99.8501 64.4839)"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M102.393 85.4947C102.482 85.5581 102.588 85.5935 102.698 85.5962L102.759 85.586L111.894 84.3274C112.171 84.2906 112.366 84.0364 112.33 83.759L109.478 63.1647C109.463 63.0303 109.394 62.9079 109.287 62.8255C109.179 62.7432 109.043 62.7081 108.909 62.7282L99.7745 63.9868C99.6428 64.0074 99.5234 64.0761 99.4395 64.1797C99.3597 64.2874 99.3268 64.4228 99.3482 64.5552L102.2 85.1597C102.212 85.2944 102.283 85.4171 102.393 85.4947ZM103.134 84.5101L100.424 64.9206L108.544 63.8041L111.254 83.3936L103.134 84.5101Z"
            fill="#3A4374"
          />
          <rect
            x="104.676"
            y="99.3418"
            width="9.18575"
            height="36.1543"
            rx="3.248"
            transform="rotate(-7.88 104.676 99.3418)"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108.676 132.022C108.934 133.877 110.519 135.258 112.391 135.26L112.899 135.27L115.578 134.895C117.624 134.606 119.053 132.72 118.776 130.672L114.716 101.237C114.432 99.1885 112.542 97.7571 110.493 98.0401L107.814 98.4055C106.829 98.5444 105.939 99.0659 105.337 99.8569C104.736 100.651 104.476 101.652 104.616 102.638L108.676 132.022ZM110.635 99.0145C110.76 99.0044 110.886 99.0044 111.011 99.0145L110.98 99.0246C112.343 99.0319 113.494 100.04 113.68 101.39L117.74 130.825C117.921 132.306 116.883 133.659 115.406 133.87L112.726 134.245C111.246 134.42 109.896 133.385 109.681 131.911L105.621 102.476C105.513 101.755 105.703 101.022 106.149 100.446C106.584 99.8622 107.235 99.4782 107.956 99.3799L110.635 99.0145Z"
            fill="#3A4374"
          />
          <circle cx="103.672" cy="58.6072" r="24.3904" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M78.7806 59.7295C79.3858 73.0274 90.34 83.4991 103.652 83.5051C104.813 83.5046 105.972 83.4266 107.123 83.2717C120.721 81.348 130.205 68.7924 128.336 55.1866C126.514 42.0003 114.645 32.5777 101.389 33.7929C88.133 35.0081 78.1753 46.4316 78.7806 59.7295ZM100.353 34.9374C101.446 34.7876 102.548 34.713 103.652 34.7141H103.692C115.589 34.7656 125.641 43.5472 127.291 55.3287C128.616 64.9018 124.044 74.3306 115.707 79.2181C107.369 84.1056 96.9086 83.4891 89.2029 77.6561C81.4973 71.8231 78.0643 61.9225 80.5051 52.5714C82.9458 43.2203 90.7795 36.2604 100.353 34.9374Z"
            fill="#3A4374"
          />
          <circle cx="103.672" cy="58.6072" r="19.8128" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M83.3736 59.3276C83.7509 70.26 92.7228 78.9275 103.662 78.9274C104.596 78.9285 105.528 78.8641 106.453 78.7346C117.288 77.2303 124.983 67.4113 123.853 56.5308C122.723 45.6503 113.175 37.6217 102.262 38.3757C91.3494 39.1297 82.9963 48.3951 83.3736 59.3276ZM100.972 39.5251C101.864 39.404 102.762 39.343 103.662 39.3424C114.05 39.3646 122.554 47.6114 122.895 57.9941C123.236 68.3768 115.292 77.164 104.928 77.868C94.5631 78.572 85.5035 70.9398 84.4374 60.6063C83.3714 50.2728 90.6822 40.9518 100.972 39.5251Z"
            fill="#3A4374"
          />
          <path
            d="M126.967 113.59C125.626 111.888 123.928 110.502 121.993 109.53C116.177 106.485 109.509 106.586 103.388 108.515C101.216 109.205 97.0037 110.189 96.7804 113.072C96.797 114.252 97.5844 115.283 98.7191 115.609C99.8298 115.897 100.99 115.942 102.119 115.741C100.51 115.698 98.9189 116.098 97.5214 116.898C96.212 117.822 95.4914 119.842 96.5673 121.07C97.0428 121.581 97.6622 121.935 98.3435 122.085C99.8246 122.492 101.391 122.471 102.86 122.024C101.27 122.329 99.7205 122.816 98.242 123.476C97.3488 123.871 96.3541 124.572 96.4556 125.506C96.5571 126.439 97.4706 126.866 98.3029 127.15C100.054 127.751 101.883 128.093 103.733 128.165C102.137 128.455 100.627 129.104 99.3179 130.063C97.2879 131.768 97.2879 135.006 100.039 135.93C100.921 136.188 101.841 136.294 102.759 136.244C110.879 136.244 120.602 135.229 126.104 128.469C128.811 125.306 129.783 121.011 128.702 116.99C128.326 115.764 127.739 114.613 126.967 113.59Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M99.876 136.386C100.791 136.655 101.745 136.768 102.698 136.721L102.728 136.742C110.767 136.731 120.734 135.818 126.489 128.784C129.313 125.491 130.32 121.012 129.179 116.827C128.774 115.553 128.153 114.358 127.342 113.295C125.961 111.518 124.204 110.069 122.196 109.052C116.735 106.271 109.985 105.896 103.205 108.037L102.556 108.23C102.533 108.237 102.51 108.244 102.488 108.251C100.072 108.992 96.4736 110.095 96.2423 113.031C96.2309 114.308 96.9991 115.462 98.181 115.944C97.8224 116.087 97.4818 116.271 97.166 116.492C96.2733 117.136 95.6799 118.114 95.5217 119.202C95.4025 119.985 95.6201 120.781 96.1205 121.395C96.66 121.983 97.3697 122.387 98.1505 122.552C98.3308 122.605 98.5137 122.65 98.6986 122.684L97.978 122.988C96.5773 123.648 95.7957 124.704 95.948 125.577C96.1002 126.45 96.7803 127.14 98.1302 127.607C99.1217 127.951 100.14 128.213 101.175 128.388C100.378 128.685 99.6372 129.114 98.9828 129.657C97.8016 130.652 97.2246 132.191 97.4603 133.717C97.7114 134.984 98.64 136.01 99.876 136.386ZM98.4449 123.871C99.5057 123.394 100.606 123.011 101.733 122.724C102.159 122.675 102.58 122.59 102.992 122.471C103.248 122.388 103.398 122.124 103.337 121.862C103.272 121.6 103.013 121.435 102.748 121.486C102.342 121.567 101.926 121.659 101.52 121.76C100.502 121.894 99.467 121.825 98.4753 121.557C97.8959 121.438 97.3655 121.149 96.9528 120.725C96.6395 120.326 96.507 119.815 96.5874 119.314C96.7055 118.499 97.1485 117.767 97.8156 117.284C98.6981 116.726 99.7067 116.398 100.749 116.33C100.984 116.325 101.217 116.299 101.446 116.273C101.692 116.246 101.934 116.218 102.17 116.218C102.444 116.186 102.645 115.945 102.627 115.67C102.595 115.399 102.362 115.196 102.089 115.203C102.059 115.205 102.03 115.207 102 115.209C101.581 115.238 101.144 115.268 100.698 115.315C100.084 115.355 99.4676 115.279 98.8813 115.092C97.9638 114.833 97.3166 114.014 97.2776 113.062C97.4601 110.79 100.722 109.805 102.874 109.156L102.88 109.154L103.54 108.951C110.067 106.921 116.532 107.276 121.759 109.966C123.635 110.911 125.275 112.264 126.56 113.924C127.302 114.892 127.872 115.981 128.245 117.142C129.28 121.003 128.338 125.127 125.728 128.155C120.247 134.864 110.574 135.737 102.748 135.737C101.889 135.793 101.027 135.697 100.201 135.453C99.3094 135.197 98.6357 134.464 98.455 133.555C98.2748 132.382 98.7262 131.202 99.6426 130.449C100.901 129.547 102.343 128.934 103.865 128.652C104.109 128.588 104.269 128.355 104.241 128.104C104.215 127.853 104.005 127.661 103.753 127.657C101.95 127.58 100.168 127.238 98.4652 126.642C97.8156 126.429 97.0442 126.165 96.963 125.414C96.8818 124.663 97.9678 124.085 98.4449 123.871Z"
            fill="#3A4374"
          />
          <path
            d="M70.3702 58.9927C70.3702 58.9927 82.7329 77.5672 75.2523 77.8311C67.7718 78.095 67.1323 76.136 67.1323 76.136"
            fill="white"
          />
          <path
            d="M73.9124 78.4199C67.6397 78.4199 66.7363 76.7045 66.6145 76.3899C66.5269 76.1128 66.6752 75.8161 66.9495 75.72C67.2239 75.633 67.5175 75.782 67.6092 76.0549C67.6092 76.0549 68.5227 77.6282 75.2319 77.3846C75.8995 77.4461 76.5418 77.1131 76.8762 76.532C78.4799 73.4159 72.4102 63.0832 69.9336 59.3683C69.7957 59.1283 69.8667 58.8226 70.0962 58.6679C70.3256 58.5131 70.6356 58.5619 70.8065 58.7796C71.7504 60.2006 79.9415 72.7866 77.81 77.0496C77.3124 77.9776 76.324 78.535 75.2725 78.4808L73.9124 78.4199Z"
            fill="#3A4374"
          />
          <ellipse
            cx="104.799"
            cy="57.9882"
            rx="4.4863"
            ry="7.64295"
            fill="#C0C5DC"
          />
          <ellipse
            cx="49.8976"
            cy="57.988"
            rx="3.42055"
            ry="6.18135"
            fill="#3A4374"
          />
        </g>
      </svg>
    );
  }
);

//
export const MedPlusBigIcon = forwardRef<SVGSVGElement, IconProps>(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
    >
      <g filter="url(#filter0_d_1054_16957)">
        <rect x="4" width="80" height="80" rx="40" fill="#152445" />
        <path
          d="M37 40H51"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 47V33"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1054_16957"
          x="0"
          y="0"
          width="88"
          height="88"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1054_16957"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1054_16957"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
});

HospitalSVG.displayName = "HospitalSVG";
PharmacySVG.displayName = "PharmacySVG";
LaboratorySVG.displayName = "LaboratorySVG";
UploaderSVG.displayName = "UploaderSVG";
DeleteBinSVG.displayName = "DeleteBinSVG";
MedUserGroupIcon.displayName = "MedUserGroupIcon";
MedDashboardIcon.displayName = "MedDashboardIcon";
MedClaimsIcon.displayName = "MedClaimsIcon";
MedRemittanceIcon.displayName = "MedRemittanceIcon";
MedUserManagementIcon.displayName = "MedUserManagementIcon";
MedActivitylogIcon.displayName = "MedActivitylogIcon";
MedGearIcon.displayName = "MedGearIcon";
MedBellIcon.displayName = "MedBellIcon";
MedSearchIcon.displayName = "MedSearchIcon";
