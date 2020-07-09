/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:18.
 **************************************************/
function splitWith_N(str) {
  return str.split("\n");
}

function getBuildNo(v) {
  let s = v.split(".");

  if (s.length === 5) {
    //x.x.x-(beta|release|alpha).x.x
    return Number(s[4]);
  }

  if (s.length === 4 && s[2].indexOf("-") > -1) {
    return 0;
  }

  if (s.length <= 3) {
    return 0;
  }

  if (s[3].indexOf("-") > -1) {
    //x.x.x.x-suffix
    return Number(s[3].split("-")[0]);
  }

  return Number(s[3]);
}

function compareUnit(a, b) {
  return getBuildNo(b) - getBuildNo(a);
}

function searchUseVersion(tags, version, isProduction, isNoBeta, isMinio) {
  let validTags = tags.filter((line) =>
    /^v?\d+\.\d+\.\d+(\.\d+)?(-(\w+?)\.\d+(\.\d+)?)?((-\w+)(-\w+)?(-\w+)?)?$/.test(
      line
    )
  );

  if (isProduction) {
    validTags = validTags.filter((line) => line[0] !== "v");
  }

  if (isNoBeta) {
    validTags = validTags.filter((line) => !!~line.indexOf("-noBeta"));
  }

  if (isMinio) {
    validTags = validTags.filter((line) => !!~line.indexOf("-minio"));
  }

  return validTags
    .filter((line) => line.slice(Number(!isProduction)).startsWith(version))
    .sort(compareUnit);
}

exports.split = splitWith_N;
exports.searchUseVersion = searchUseVersion;
exports.getBuildNo = getBuildNo;
